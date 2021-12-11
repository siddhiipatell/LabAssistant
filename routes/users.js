var express = require("express");
var router = express.Router();

var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

//connect database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodelogin",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected successfully");
});

var obj = {};
router.get("/admin", function (req, res) {
  connection.query("SELECT * FROM users", function (err, result) {
    if (err) {
      throw err;
    } else {
      obj = { print: result };
      res.render("print", obj);
    }
  });
});

// router.get('/admin', function(request, response){
//     fetchData(response);n
//     console.log('done displayed data');
// });

// function executeQuery(sql, cb){
//     connection.query(sql, function(err, result, fields){
//         if(err) {throw err;}
//         cb(result);
//     })
// }

// function fetchData(response){
//     executeQuery('SELECT * FROM commentbox', function(result){
//         console.log(result);
//         response.write('<table><tr>');
//         for(var column in result[0]){
//             response.write('<td><label' + column + '<label></td>');
//             response.write('</tr>');
//         }
//         for (var row in result){
//             response.write('<tr>');
//             for(var column in result[row]){
//                 response.write('<td><label>' + result[row][column] + '</label></td>');
//             }
//             response.write('</tr>');
//         }
//         response.end('</table>');
//     });
// }

module.exports = router;
