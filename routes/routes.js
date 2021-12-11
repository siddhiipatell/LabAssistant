var express = require("express");
var router = express.Router();

var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

//connect database
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});
connection.connect(function(err) {
	if (err) throw err;
	console.log('Database is connected successfully !');
  });

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

//authenticate user
router.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/labinfo');
			} else {
				response.render('login');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.get('/labinfo', function(request, response) {
	if (request.session.loggedin) {
		response.render('labinfo');
	} else {
        response.render('login');
    }
	response.end();
});

router.get('/logout', function(request, response) {
	request.session.loggedin = false;
	response.render('login');
		
});


router.post('/create', function(req, res) {
	var id = req.body.id;
	var email = req.body.email;
	var message = req.body.message;
   
	var sql = `INSERT INTO commentbox (id,email, message) VALUES ("${id}", "${email}", "${message}")`;
	connection.query(sql, function(err, result) {
	  if (err) throw err;
	  console.log('record inserted');
	  res.render('labinfo');
	  
	});
  });





router.get('/homebtn', function(req, res) {
	res.render("home");
});
router.get('/homebtna', function(req, res) {
	res.render("home");
});

router.get("/",function(req, res){
    console.log("hello i m on the home page");
    res.render("home");
});

router.get("/login",function(req, res){
    res.render("login");
});

// router.get("/admin", function(req, res){
//     res.render("admin");
// });
router.get("/adminlogin", function(req, res){
	res.render("adminlogin");
});
router.get("/IOT",function(req, res){
	res.render("IOT");
});
router.get("/VR", function(req, res){
	res.render("VR");
});
router.get("/Sophos",function(req, res){
	res.render("Sophos");
});
router.get("/MOBILEAPP", function(req, res){
	res.render("MOBILEAPP");
});
router.get("/GPU", function(req, res){
	res.render("GPU");
});
router.get("/Imageprocessing", function(req, res){
	res.render("Imageprocessing");
});
router.get("/Networkinglab", function(req, res){
	res.render("Networkinglab");
});
router.get("/Webtechnology", function(req, res){
	res.render("Webtechnology");
});



module.exports = router;