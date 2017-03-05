
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

INSERT INTO products (position, item_id, product_name, department_name, item_price, instock_quantity, item_sale, item_sale_total, department_sale)
VALUES (10, "3301210", "lamp", "lighting", 15.000, 40, 05.678, 0500.67, 0500.67);


SELECT * FROM products;
