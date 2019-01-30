var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
console.log(process.env)

var connection = mysql.createConnection({
    host: "localhost",


    port: 3306,

    user: "root",

    // Your password
    password: process.env.MYSQL_PASSWORD,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    display();
    prompt();
});

var display = function () {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | ", res[i].product_name + " | ", res[i].department_name + " | ", res[i].price + " | ", res[i].stock_quantity);
        };
    });
};

var prompt = function () {
    showQuestions();
};

var showQuestions = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "item",
                    type: "input",
                    message: "Name of product ID you would like to buy?"
                },
                {
                    name: "qty",
                    type: "input",
                    message: "How many would you like to buy?"
                }
            ])
            .then(function (answer) {
                connection.query("SELECT*FROM products WHERE id=?", [answer.item], function (err, res) {
                    for (var i = 0; i < res.length; i++) {
                        if (answer.qty <= res[i].stock_quantity) {
                            var total = res[i].price * answer.qty
                            console.log("--------------------------")
                            console.log("The " + res[i].product_name + " are in stock!!!")
                            console.log("--------------------------")
                            console.log("You bought " + answer.qty + " of the " + res[i].product_name + ". Your Total Price is $" + total)
                            console.log("--------------------------")
                            var newQTY = res[i].stock_quantity - answer.qty
                            var query = connection.query("UPDATE products SET? WHERE ?",
                                [{
                                    stock_quantity: newQTY
                                },
                                {
                                    id: answer.item
                                }
                                ]
                                , function (updateResults) {
                                    console.log("There are now " + newQTY + " left in stock");
                                    console.log("--------------------------");
                                    startOver();
                                });
                        }
                        else {
                            console.log("-----------------------------")
                            console.log("Sorry this item is out of Stock. Pick another item!");
                            console.log("-----------------------------")
                            prompt();
                        }
                    }
                })
            });
    })
}

var startOver = function () {
    inquirer.prompt([
        {
            name: "yesorno",
            type: "list",
            message: "Would you like to buy something else?",
            choices: ["Yes", "No"],
        }
    ])
        .then(function (ans) {
            if (ans.yesorno === "Yes") {
                display();
                showQuestions();
            }
            else {
                console.log("Thank you! Come again!")
                connection.end();
            }
        })
};
