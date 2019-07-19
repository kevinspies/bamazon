var mysql = require("mysql");
var columnify = require("columnify");
const inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);


    afterConnection();
});

function afterConnection() {

    showProducts();

    inquirer.prompt([
        {
            type: "input",
            message: "ID of product you'd like to buy",
            name: "item"
        },
        {
            type: "input",
            message: "how many?",
            name: "number"
        }
    ]).then(function (userInput) {

        console.log("Great, now let's process your request of... " + userInput.number + " amount of id#" + userInput.item);

        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            console.log("we are looking at the products table yaaaasssss");
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                var currentRow = res[i];
                console.log("item " + i + " id: " + currentRow.item_id);
                if (currentRow.item_id === userInput.item) {
                    console.log("item found in database!");
                    //now check to see if there is a sufficient amount
                    if (currentRow.stock_quantity > userInput.number) {
                        //sufficient quantity
                        console.log("there is sufficient quantity in the store! We will be able to process your order soon.");
                    }
                    else {
                        console.log("insufficient quantity in the store, sorry");
                    }
                }
            }
        });

    }).catch(function (er) {
        console.log(err);
    });
}

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //was trying to make columnify work but putting that on hold
        // var columns = columnify(res, options);
        var columns = columnify(res);
        console.log(columns);
        // console.log(res);
        // queryDepartmentProducts();
    });
}

// connection.end(); 