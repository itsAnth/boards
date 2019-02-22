var _ = require('lodash');
var path    = require("path");
var config = require('../../config/config');
var logger = require('../util/logger');

exports.home = function(req, res, next) {

	var data = {
		boards: [
			{
				id: 1,
				price: 299,
				name: 'Sapient',
				description:'For the beginner',
				added: true
			},
			{
				id: 2,
				price: 299,
				name: 'Sapient',
				description:'For the beginner',
				added: false
			},
			{
				id: 3,
				price: 399,
				name: 'Sapient',
				description:'For the beginner',
				added: false
			},
			{
				id: 4,
				price: 299,
				name: 'Sapient',
				description:'For the beginner',
				added: false
			},
			{
				id: 5,
				price: 499,
				name: 'Sapient',
				description:'For the beginner',
				added: false
			},
			{
				id: 6,
				price: 599,
				name: 'Sapient',
				description:'For the beginner',
				added: false
			},
			{
				id: 7,
				price: 599,
				name: 'Sapient',
				description:'For the beginner',
				added: false
			},
			{
				id: 8,
				price: 699,
				name: 'Sapient',
				description:'For the beginner',
				added: false
			},
			{
				id: 9,
				price: 799,
				name: 'Sapient',
				description:'For the beginner',
				added: false
			}
		]
	}

    res.render("index", data);
};