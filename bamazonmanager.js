var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

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
    menuOptions();
});

var menuOptions = function () {
    inquirer.prompt([
        {
            name: "menu",
            type: "list",
            message: "Choose a Manager Option:",
            choices: ["View Products", "View Low Inventory", "Add Inventory", "Add New Product"]
        }
    ])
        .then(function (answer) {
            if (answer.menu === "View Products") {
                display();
            }
            if (answer.menu === "View Low Inventory") {
                lowInventory();
            }
            if (answer.menu === "Add Inventory") {
                addInventory();
            }
            if (answer.menu === "Add New Product") {
                addProduct();
            }
        })
};

var display = function () {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("-----------------------------")
            console.log(res[i].id + " | ", res[i].product_name + " | ", res[i].department_name + " | ", res[i].price + " | ", res[i].stock_quantity);
            console.log("-----------------------------")
        };
        startOver();
    });
};

var startOver = function () {
    inquirer.prompt([
        {
            name: "startOver",
            type: "list",
            message: "Would you like to see the menu again?",
            choices: ["Yes", "No"]
        }
    ])
        .then(function (answers) {
            if (answers.startOver === "Yes") {
                menuOptions();
            }
            else {
                console.log("Thank you! Bye");
                connection.end();
            }
        })
};

var lowInventory = function () {
    connection.query("SELECT * FROM products", function (err, resl) {
        if (err) throw err;
        console.log("Products with 1000 or more units");
        for (var i = 0; i < resl.length; i++) {
            if (resl[i].stock_quantity >= 500) {
                console.log(resl[i].id + " | ", resl[i].product_name + " | ", resl[i].department_name + " | ", resl[i].price + " | ", resl[i].stock_quantity);
                console.log("-----------------------------")
            }
        }
        startOver();
    })
};
var addInventory = function () {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What id do you want to add inventory too?"
        },
        {
            name: "inventory",
            type: "input",
            message: "How much inventory?"
        },
    ])
        .then(function (answer) {
            connection.query("SELECT*FROM products WHERE id=? ", answer.id, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                   
                    math = parseInt(res[i].stock_quantity) + parseInt(answer.inventory);
                  

                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: math
                            },
                            {
                                id: answer.id
                            },
                        ])
                        console.log("-----------------------------");
                        console.log( math + " of inventory has been added to " + res[i].product_name);
                        console.log("-----------------------------");

                }
                
                startOver();
            });
        });
}


var addProduct = function () {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "Enter Product Name",
        },
        {
            name: "department",
            type: "input",
            message: "Enter the Department Name",
        },
        {
            name: "price",
            type: "input",
            message: "What is the price?"
        },
        {
            name: "stock",
            type: "input",
            message: "How much stock is available?"
        }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO products SET?",
                {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock,
                },
                console.log("-----------------------------"),
                console.log(answer.product + " has been added."),
                console.log("-----------------------------"),
                startOver())
        })
        
};