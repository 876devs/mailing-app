var express = require('express');
var router = express.Router();
var Client = require('../models/client');

/**
 * Gets a list of all clients within
 * the database.
 */
router.get('/clients', function(req, res) {
 	Client.find().exec(function(err, clients){
		if(err) res.json('Something went wrong');
		res.json(clients);
	});
});
/**
 * Creates a client from the request body.
 */
router.post('/clients', function(req, res){
	var client = new Client(req.body);
	client.created = Date.now();
	client.save(function(err, client){
		if(err) res.json('Something went wrong');
		res.json(client);
	});
});

module.exports = router;
