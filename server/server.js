////////////////////////////
///////Import Modules///////
////////////////////////////
var http = require('http');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require("path");

////////////////////////////
///////Import Files/////////
////////////////////////////
var api = require('./api/api');
var config = require('../config/config');
var logger = require('./util/logger');

////////////////////////////
//////Global Variables//////
////////////////////////////
var app = express();
var server = http.createServer(app);

////////////////////////////
//////////Config////////////
////////////////////////////
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'server/html/views');

////////////////////////////
/////////API Routes/////////
////////////////////////////
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
app.all('*',function(req,res,next)
  {
	  if (!req.get('Origin')) return next();
	  res.set('Access-Control-Allow-Origin','*');
	  res.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
	  res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
	  if ('OPTIONS' == req.method) return res.send(200);
	  next();
  });
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.use('/', api);

// Global error handling
app.use(function(err, req, res, next) {
	var errMessage;
	if (err.message === '') {
		errMessage = 'Something went wrong with your request.';
	} else {
		errMessage = err.message;
	}
	var oRes = {
		success: false,
		payload: {error: errMessage}
	};
	var sResponse = JSON.stringify(oRes);
	res.type('json');
	switch(err.message) {
		case "406":
		    res.status(406).send(sResponse);
		    break;
		default:
		    res.status(400).send(sResponse);
	}
});

////////////////////////////
///////Export Server////////
////////////////////////////
module.exports = server;