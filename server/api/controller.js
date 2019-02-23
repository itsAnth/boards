var _ = require('lodash');
var path    = require("path");
var config = require('../../config/config');
var logger = require('../util/logger');
require('dotenv').config();

var stripe = require("stripe")(process.env.SECRET_KEY);

var data = {
	publicKey:process.env.PUBLISHABLE_KEY,
	boards: [
	{
		id: 1,
		price: 100,
		name: 'Burton',
		description:'All mountain board for the beginner',
		added: true
	},
	{
		id: 2,
		price: 100,
		name: 'Sapient',
		description:'Freestyle board for terrain park',
		added: false
	},
	{
		id: 3,
		price: 100,
		name: 'Rome Gang',
		description:'Our most popular all mountain board',
		added: false
	},
	{
		id: 4,
		price: 100,
		name: 'DC',
		description:'Freestyle board, ideal for doing tricks',
		added: false
	},
	{
		id: 5,
		price: 100,
		name: 'LIB Tech',
		description:'Light, short freestyle board',
		added: false
	},
	{
		id: 6,
		price: 100,
		name: 'K2',
		description:'Powder board for deep powder',
		added: false
	},
	{
		id: 7,
		price: 100,
		name: 'Chamonix',
		description:'Freeride board for going fast',
		added: false
	},
	{
		id: 8,
		price: 100,
		name: 'GNU',
		description:'Freestyle board for pro riders',
		added: false
	},
	{
		id: 9,
		price: 100,
		name: 'LIB Tech',
		description:'All mountain board for experienced riders',
		added: false
	}
	]
}

exports.params = function(req, res, next, term) {;
	req.term = term.split('+');
	next();
};

exports.home = function(req, res, next) {

	res.render("index", data);
};

exports.getId = function(req, res, next) {
	let cartData = [];
	let hostUrl = req.protocol + '://' + req.get('host');

	for (var i = 0; i < req.term.length; i++) {
		let index = parseInt(req.term[i]-1);
		let item = {
			amount: data.boards[index].price*100,
			quantity: 1,
			name: data.boards[index].name,
			currency: "usd"
		}
		cartData.push(item);
	}

	stripe.checkout.sessions.create(
	{
		success_url: hostUrl + "/success",
		cancel_url: hostUrl,
		payment_method_types: ["card"],
		line_items: cartData
	},
	{stripe_version: "2018-11-08; checkout_sessions_beta=v1"},
	function(err, session) {
	    var oRes = {
			id: session.id
		};
		var sResponse = JSON.stringify(oRes);
		res.type('json');
		res.status(200).send(sResponse);
	});
}


exports.checkout = function(req, res, next) {
	let cartData = {
		publicKey:process.env.PUBLISHABLE_KEY,
		boards:[],
		total: 0,
		sTotal:0
	};

	for (var i = 0; i < req.term.length; i++) {
		let index = parseInt(req.term[i]-1);
		cartData.boards.push(data.boards[index]);
		cartData.total += data.boards[index].price;
		cartData.sTotal += data.boards[index].price*100;
	}
	res.render("checkout", cartData);
}

exports.charge = function(req, res, next) {
	const token = req.body.stripeToken; // Using Express
	const price = req.body.price;
	(async () => {
	  const charge = await stripe.charges.create({
	    amount: price*100,
	    currency: 'usd',
	    description: 'Boards',
	    source: token,
	  }, function(err, d) {
	  	let id = d.id;
	  	res.redirect('/success?id=' + id + '&price=' + price);
	  });
	})()
}

exports.success = function(req, res, next) {
	let id = req.query.id;
	let price =  req.query.price;
	let temp = {
		id:id,
		price: price
	};
	console.log(temp);
	res.render("success", temp);
}