/**
 * Created by tremaine on 12/5/15.
 */
var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var Client = require('../models/client');
var async_ = require('async');

/**
 * Creates a client from the request body.
 */
router.post('/email', function(req, res){
    var email = new sendgrid.Email(),
        message = "";
    Client.find().exec(function(err, clients){
       if(err) message = "Error Occurred Client";
        async_.each(clients, function(client, callback){
            email.addTo(client.email);
            email.setFrom(process.env.REPLY_TO || "876devs@gmail.com");
            email.setText('Testing 123');
            email.setSubject('From Mailing App');
            email.setName('Tremaine Buchanan');
            sendgrid.send(email, function(err, json){
                if(err) message = "Error Send Grid";
                callback(message);
            })
        }, function(err,message){
            message = "All went well";
            res.json({message: message});
        });
    });

});

module.exports = router;

