//Loading all the dependencies for node w.r.t npm packages

var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");

// To present a good "UI" loading all dependencies,
var Table = require('cli-table');
var colors = require('colors');
// Connection to the database

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "Bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  currentStocks();
});

  // Function for displaying "current instock", by providing choices to the user,

var currentStocks = function() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product to the Inventory"
    ]
  }).then(function(answer) {
    switch (answer.action) {
      case "View Products for Sale":
        productsOnSaleSearch();
        break;

      case "View Low Inventory":
        productsWithLowInventorySearch();
        break;

      case "Add to Inventory":
        stockAddition();
        break;

      case "Add New Product to the Inventory":
        newProductsAddition();
        break;
    }
  });
};

  // Displaying the "current products on sale" in the form of table, by making a query

var productsOnSaleSearch = function() {
      var query = "SELECT item_id, product_name, item_price, instock_quantity FROM products";
      connection.query(query, function(err, res) {
        var table = new Table({
          head: ["Item Id", "Product Name", "Price", "In Stock"]

        })
        //console.log("============================================================================");
        //console.log("| Item Id    |   Product Name    |   Price   |   In Stock   |");
      for (var i = 0; i < res.length; i++) {
        table.push(
          [res[i].item_id, res[i].product_name, res[i].item_price, res[i].instock_quantity]

          );
        //console.log("| " + res[i].item_id + " | " + res[i].product_name + " | " 
           // + res[i].item_price + " | " + res[i].instock_quantity + " | ");
      }        
      console.log(table.toString());
      currentStocks();
    });
}

  // Function for displaying the "products with low inventory count" in the form of table, by making a query

var productsWithLowInventorySearch = function() {
  console.log("In");
  var query = "SELECT item_id, product_name, item_price, instock_quantity FROM products WHERE instock_quantity < 5";
  connection.query(query, function(err, res) {

    if (res.length == 0) {
      console.log("No products with low inventory as of now.");
    }
    else {
      var table = new Table({
      head: ["Item Id", "Product Name", "Price", "In Stock"]

        })
        //console.log("============================================================================");
        //console.log("| Item Id    |   Product Name    |   Price   |   In Stock   |");
    for (var i = 0; i < res.length; i++) {
      table.push(
          [res[i].item_id, res[i].product_name, res[i].item_price, res[i].instock_quantity]

          );
        //console.log("| " + res[i].item_id + " | " + res[i].product_name + " | " 
           // + res[i].item_price + " | " + res[i].instock_quantity + " | ");

    }
  }      
    console.log(table.toString());
    currentStocks();
  });
}

  // Function for "addition of new stock" to the current stock of any "item_id"

var stockAddition = function ()  {
  inquirer.prompt({
    name: "addToItemId",
    type: "input",
    message: "Please, Enter the Item_ID of the product you would like to add more stock to the current quantity?"
  }).then(function(answer) {
        var query1 = "SELECT item_id, product_name, instock_quantity, item_price FROM products WHERE item_id = " + answer.addToItemId;
        connection.query(query1, function(err, res1) {
          inquirer.prompt({   // second inquirer
              name: "addToItemNo",
              type: "input",
              message: "How much quantity of " + res1[0].product_name + " would you like to add?"  // question -2
          }).then(function(answer) {
                var totalQuantity = res1[0].instock_quantity + parseInt(answer.addToItemNo); // updating the database with latest instock no.s
                var updatedInStock = totalQuantity;
                var query2 = "UPDATE products SET instock_quantity = " + updatedInStock + " WHERE item_id = " + res1[0].item_id;
                connection.query(query2, function(err, res2) { 
              });
              currentStocks();            

            });

          });
      });

    }

  // Function to "add a completely new product to the inventory" by giving prompts for user enrties

var newProductsAddition = function ()  {
  var query = "SELECT MAX(position) AS maxPosition FROM products";
  connection.query(query, function(err, res) {
      var newPosition = res[0].maxPosition + 1;
      console.log(newPosition);
      inquirer.prompt([{
            name: "item_id",
            type: "input",
            message: "What is the item_id you would like to submit?"
          }, {
            name: "product_name",
            type: "input",
            message: "What is the product_name you would like to submit?"
          }, {
            name: "department_name",
            type: "input",
            message: "What is the department_name you would like to submit?"
          }, {
            name: "item_price",
            type: "input",
            message: "What is the item_price you would like to submit?"
          }, {
            name: "instock_quantity",
            type: "input",
            message: "What is the instock_quantity you would like to submit?"
      }]).then(function(answer) {
          connection.query("INSERT INTO products SET ? ", {
              position: newPosition,
              item_id: answer.item_id,
              product_name: answer.product_name,
              department_name: answer.department_name,
              item_price: answer.item_price,
              instock_quantity: answer.instock_quantity
        }, function(err, res) {
          if (err) throw err;
      console.log("Your product has been inserted into the inventory successfully!");
      currentStocks();            
    });
  })
  });
  }



