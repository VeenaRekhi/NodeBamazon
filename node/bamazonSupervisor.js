
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
currentDepts();
});

// displaying the "current-data", by making a query

var currentDepts = function() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "View Product Sales by Department",
      "Create New Department"  
    ]
  }).then(function(answer) {
    switch (answer.action) {
      case "View Product Sales by Department":
        productSalesByDept();
        break;

      case "Create New Department":
        createNewDept();
        break;
    }
  });
};

// displaying the "current-product Sale by Dept", by making a query

var productSalesByDept = function() {
      var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, departments.total_sales, SUM(products.product_sales) AS totalProductSales, ";
      query += " (departments.total_sales - departments.over_head_costs) AS total_profit FROM departments LEFT OUTER JOIN products ON (departments.department_name = products.department_name)";
	  query += " GROUP BY departments.department_name ORDER BY departments.department_id ";  
      connection.query(query, function(err, res) {
      	console.log(res.length + " matches found!");
      	var table = new Table({
      		head: ["Dept Id", "Dept Name", "Overhead", "Product Sales", "Total Profit"]

      	})

      	//console.log("=================================================================");
        //console.log("| Dept Id | Dept Name | Overhead | Product Sales | Total Profit |");
      for (var i = 0; i < res.length; i++) {
      	if (res[i].totalProductSales == null) {
      		res[i].totalProductSales = 0;
      	}
      	table.push(
      		[res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].totalProductSales, res[i].total_profit]

      		);
       // var output = "| " + res[i].department_id + " | " + res[i].department_name + " | " + res[i].over_head_costs + " | ";
        	//output = output + res[i].totalProductSales + " | " + res[i].total_profit + " | ";
        	//console.log(output);
      }
      console.log(table.toString());
      currentDepts();
    });
  }

// Function for addition of a new department,

var createNewDept = function () {
	var query = "SELECT MAX(department_id) AS maxDepartmentID FROM departments";
    connection.query(query, function(err, res) {
      var newDepartment = res[0].maxDepartmentID + 1;	
      inquirer.prompt([{
          	name: "department_name",
            type: "input",
            message: "What is the department_name you would like to submit?"
          }, {
            name: "over_head_costs",
            type: "input",
            message: "What is the over_head_costs you would like to submit?"
      }]).then(function(answer) {
          connection.query("INSERT INTO departments SET ? ", {
              department_id: newDepartment,
              department_name: answer.department_name,
              over_head_costs: answer.over_head_costs,
              total_sales: 0
        }, function(err, res) {
          if (err) throw err;
      console.log("Your new department has been created into the inventory successfully!");
	  currentDepts();            
    });
  })
  });
  }



