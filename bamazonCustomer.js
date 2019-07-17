var mysql = require("mysql");
var columnify = require("columnify");

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
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //was trying to make columnify work but putting that on hold
        // var columns = columnify(data, options);
        console.log(res);
        queryAllSongs();
        connection.end();
    });
}
function queryAllSongs() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}



