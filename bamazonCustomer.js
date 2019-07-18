var mysql = require("mysql");
var columnify = require("columnify");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"

});
//uncomment if i want to connect and run query at the same time for some reason
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     connection.end();
// });

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);


    // afterConnection();
});
//maybe this after connection method is superflous?
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //was trying to make columnify work but putting that on hold
        // var columns = columnify(res, options);
        var columns = columnify(res);
        console.log(columns);
        // console.log(res);
        // queryDepartmentProducts();
        connection.end();
    });
}
function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}
function queryDepartmentProducts() {
    //i should replace 'Clothes' with some input from inquirer!
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Clothes"], function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
    });
}

//i want a function for querying the item name, so i can call that and tell the user 
//what item they just bought
function queryItem() {
    connection.query("SELECT")
}

//let's put inquirer here, i think it is a good place for it?*test*, right after we 
//connect, before we make any queries actually, shouldn't it be in afterConnection()?
//well now it's here *test*
//theoretically couldn't i leave it here, connect above, compiler reads through, finally gets 
//here to inquirer where all the interfacing and everything happens, i am connected
//so everything is fine.
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
]).then(function (input) {
    // if (inqRes.confirm) {
    console.log("Great, now let's process your request of... " + input.number + " amount of id#" + input.item);
    // }
    // else {
    //     console.log("\nThat's okay, come again when you are more sure.\n");
    // }

    //QUERIES GO HERE

});
