var start = function() {
};

var postBuy = function() {
  inquirer.prompt([{
    name: "item",
    type: "input",
    message: "What is the "ID" of the item you would like to buy?"
  }, {
    name: "item_count",
    type: "input",
    message: "How many units of the item would you like to buy?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
    connection.query("INSERT INTO products GET ?", {
      item_id: answer.item_id,
      product_name: answer.product_name,
      item_price: answer.item_price
    }, function(err, res) {
      console.log("Please, have a look at the list of items for sale!");
      displayTable();
      start();
    });
  });
};

var sale = 
var searchInStocks = function() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "Find items by item_id, product_name and item_price"
    ]
  }).then(function(answer) {
     	var query = "SELECT item_id, product_name, item_count FROM products WHERE ?";
    	connection.query(query, { item: answer.item }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product Name: $ " + 
        	res[i].product_name + " || Counts of the Item: " + res[i].item_count);
             if (chosenItem.item_count < parseInt(answer.item_count)) {
                console.log("Yes! We have the item instock! Please, proceed for payment!");
                //sale();
                //instockUpdate();
            }
            else {
              console.log("Sorry! We do not have the item instock!!");
              start();
            }
          };
    });
});

var sale = function ()  {
    if (chosenItem.item_count < parseInt(answer.item_count)) {
      
} else if () {

}


/// Please, use a table from npm pacakage with color.js 
var Table = require('cli-table');

// instantiate
var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
  , colWidths: [100, 200]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
    ['First value', 'Second value']
  , ['First value', 'Second value']
);

console.log(table.toString());

