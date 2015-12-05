var express = require('express');
var router = express.Router();
var Client = require('../models/client');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users', function(req, res, next){
	var client = new Client(req.body);
	client.created = Date.now();
	client.save(function(err, client){
		if(err) res.json('Something went wrong');
		res.json(client);
	});
});

module.exports = router;
