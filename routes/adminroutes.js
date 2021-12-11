var express = require("express");
var router = express.Router();


var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());



router.post('/autha', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accountsa WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedina = true;
				request.session.username = username;
				response.redirect('/admin');
			} else {
                response.render('adminlogin');
            }
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// router.get('/logout', function(request, response) {
// 	request.session.loggedina = false;
// 	res.render('login');

// });


router.get('/admin', function(request, response) {
	if (request.session.loggedina) {
		response.render('admin');
	} else {
		response.render('adminlogin');
	}
	response.end();
});

router.get('/adminlogout', function(request, response) {
	request.session.loggedina = false;	
	response.render('adminlogin');
		 
});

module.exports = router;