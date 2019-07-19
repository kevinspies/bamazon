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
//uncomment if i want to connect and run query at the same time for some reason
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     connection.end();
// });

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);


    afterConnection();
});
//maybe this after connection method is superflous?
function afterConnection() {

    //let's put inquirer here, i think it is a good place for it?*test*, right after we 
    //connect, before we make any queries actually, shouldn't it be in afterConnection()?
    //well now it's here *test*
    //theoretically couldn't i leave it here, connect above, compiler reads through, finally gets 
    //here to inquirer where all the interfacing and everything happens, i am connected
    //so everything is fine.

    showProducts();//glitchy spacing on terminal input here, inquirer text
    //showing up too quickly and moving the column titles to the right
    //aka this first question's text basically get's in the way, why!?!?
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
    ]).then(function (userInput) {//promise

        console.log("Great, now let's process your request of... " + userInput.number + " amount of id#" + userInput.item);
        //I CAN HAVE MULTIPLE .THEN's

        // if (inqRes.confirm) {
        // }
        // else {
        //     console.log("\nThat's okay, come again when you are more sure.\n");
        // }
        //* *******QUERIES GO HERE***********

        //connect to mysql database (already done)
        //check if there are enough items to meet their request, otherwise give them an error

        //this line grabs all items from product table with the desired item ID - the one they want! (i think)
        // connection.query("SELECT * FROM products WHERE ?", { item_id: userInput.item }, function (err, res) {

        // connection.query("SELECT * FROM products WHERE ?", { item_id: userInput.item }, function (err, res) {
        //     // if (err) {
        //     //     console.log("**error with inquirer response!**");
        //     //     throw err;
        //     // }
        //     console.log("this is how many items you want! : " + userInput.item);
        //     console.log("response: " + res);

        // });

        //maybe i just need to do an update here.....

        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            console.log("we are looking at the products table yaaaasssss");
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                console.log("item " + i + " id: " + res[i].item_id);
                if (res[i].item_id == userInput) {
                    console.log("item found in database!");

                }
            }
        });
        //now i can go through the json and at least hard code to see if i have enough



        // connection.query("SELECT products.stock_quantity", function)

        //if there are enough items, update the SQL database to reflect the remaining quantity
        //then, show the customer the total cost of their purchase


        //it would be cool to have timeouts for after the user inputs something, display their temp SELECT table? (maybe) then a second or two later re prompt them (probably tricky)
        // afterConnection();//call again to keep the questions coming

    }).catch(function (err) {
        console.log(err);
    });
    //more .then's here if i want?





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

// function queryItem() {
//     connection.query("SELECT")
// }


// connection.end();


