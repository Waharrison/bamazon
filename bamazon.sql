DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30),
department_name VARCHAR(20),
price INTEGER(20),
stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("TV", "Electronics", 100, 1000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Tshirt", "Clothing", 20, 2000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Pens", "Office", 5, 1000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Apple Juice", "Food", 3, 1000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Radio", "Electronics", 50, 1000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Hammer", "Tools", 10, 2000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Screw Driver", "Tools", 10, 1000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Jeans", "Clothing", 20, 5000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Steak", "Food", 20, 500);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE   ("Remote", "Electronics", 12, 3000);