
//Loading all the dependencies for node w.r.t npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// To present a good "UI" loading all dependencies,
var Table = require('cli-table');
var colors = require('colors');

var output = "";
// Connection to the database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // username
  user: "root",

  // password
  password: "root",
  database: "Bamazon_db"
});
  // making connection with the database
connection.connect(function(err) {
  if (err) throw err;
});
  // displaying the data in the form of table, by making a query

    var query = "SELECT item_id, product_name, department_name, item_price, instock_quantity FROM products";
    connection.query(query, function(err, res) {
    	var table = new Table({
      		head: ["Item Id", "Product Name", "Department", "Item Price", "In Stock"]

      	})
    	//console.log("============================================================================");
    	//console.log("| Item Id   |   Product Name   |   Department   |   Price   |   In Stock   |");
      for (var i = 0; i < res.length; i++) {
      	table.push(
      		[res[i].item_id, res[i].product_name, res[i].department_name, res[i].item_price, res[i].instock_quantity]

      		);
        //console.log("| " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name
        	// + " | " + res[i].item_price + " | " + res[i].instock_quantity + " | ");
      } 

       console.log(table.toString());

// Running an inquirer prompt within an inquirer prompt to give the sequence 
//and priority to the questions needs to be answered first
  		inquirer.prompt({    // first inquirer
		    name: "buyItemId",
		    type: "input",
		    message: "Please enter the Item Id of the product you would like to buy!"  // question -1
		}).then(function(answer) {
			var query1 = "SELECT item_id, product_name, department_name, item_price, instock_quantity, product_sales FROM products WHERE item_id = " + answer.buyItemId;
		    connection.query(query1, function(err, res1) {
		  		inquirer.prompt({   // second inquirer
				    name: "buyItemNo",
				    type: "input",
				    message: "How many " + res1[0].product_name + " would you like to buy?"  // question -2
		  		}).then(function(answer) {
		  			if (parseInt(answer.buyItemNo) > res1[0].instock_quantity) {  // using parseInt for integers in instock_quantity
		  				console.log("Sorry!! We don't have enough quantity in stock");
		  			}
		  			else {
		  				var totalCost = parseInt(answer.buyItemNo) * res1[0].item_price; // updating the database with latest instock no.s
		  				console.log("Please pay : " + totalCost);
		  				var new_product_sales = res1[0].product_sales + totalCost;   // updating the databse with new product sale and adding it to the total revenue
                        var remainingInStock = res1[0].instock_quantity - parseInt(answer.buyItemNo);  
		  				var query2 = "UPDATE products SET instock_quantity = " + remainingInStock + ", product_sales = " + new_product_sales + " WHERE item_id = " + res1[0].item_id;
		  				connection.query(query2, function(err, res2) { 
		  				});
		  				var query3 = "SELECT total_sales FROM departments WHERE department_name = '" + res1[0].department_name + "'";
		  				connection.query(query3, function(err, res3) { 
		  					var newTotalSales = res3[0].total_sales + totalCost;
			  				var query4 = "UPDATE departments SET total_sales = " + newTotalSales + " WHERE department_name = '" + res1[0].department_name + "'";
			  				connection.query(query4, function(err, res2) { 
		  					});
		  				});
		  			}

		  		});
      		  
		  });

    });
});
