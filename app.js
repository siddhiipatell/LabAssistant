var express = require("express");
var path = require("path");


var routes = require('./routes/routes');
var routesa = require('./routes/adminroutes');
var routesu = require('./routes/users');



var app = express();

app.use(express.static("public"))
app.use("/css",express.static(__dirname+"public/css"));
app.use("/img",express.static(__dirname+"public/img"));


app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.use(routes);
app.use(routesa);
app.use(routesu);

app.listen(app.get("port"), function() {
    console.log("Server sarted on port " + app.get("port"));
 });


 