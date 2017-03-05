
CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products (
	position INT (50) NOT NULL,
	item_id INTEGER (100) NULL, 
	product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
	item_price DECIMAL (5,3),
	instock_quantity INTEGER (100), 
	item_sale DECIMAL (5,3),
	item_sale_total DECIMAL(7,3),
	department_sale DECIMAL(7,3),
    PRIMARY KEY (position)
);

ALTER TABLE products ADD COLUMN product_sales INTEGER (100) NULL;

SELECT * FROM products;


INSERT INTO products (position, item_id, product_name, department_name, item_price, instock_quantity, item_sale, item_sale_total, department_sale)
VALUES (10, "3301210", "lamp", "lighting", 15.000, 40, 05.678, 0500.67, 0500.67);

USE Bamazon_db;

CREATE TABLE departments (
    position INT (50) NOT NULL,
    department_id INTEGER (100) NULL,
    department_name VARCHAR (100) NULL,   
    over_head_costs INTEGER (100) NULL,  
    total_sales INTEGER (100) NULL,
    PRIMARY KEY (position)
);

INSERT INTO departments VALUES (1, "clothing", 1200, 1500);

SELECT * FROM departments;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments INNER JOIN products ON (departments.department_name = products.department_name)


SELECT SUM (product_sales) AS totalProductSales FROM products WHERE department_name = 'electronics';

SELECT departments.department_id, departments.department_name, departments.over_head_costs SUM(products.product_sales) AS totalProductSales FROM departments INNER JOIN products ON (departments.department_name = products.department_name);

UPDATE departments SET department_id = 6 WHERE department_name = "toys";
SELECT * FROM departments;
