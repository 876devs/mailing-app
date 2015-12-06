/**
 * Created by tremaine on 12/5/15.
 */
var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var Client = require('../models/client');
var async_ = require('async');

/**
 * Retrieves each client from the database and send
 * each client an email.
 */
router.post('/emails', function(req, res){
    var message = {}, addresses = [];
    async_.waterfall([
        function(callback){
            Client.find().exec(function(err, clients){
                if(err) message.text = "Error in retrieving clients";

                callback(null,clients)
            });
        }, function(clients, callback){
             clients.forEach(function(client){
                addresses.push(client.email);
               });
            callback(null, addresses);
        }
    ], function(err,addresses){
        var email = new sendgrid.Email();
        email.setSmtpapiTos(addresses);
            email.setFrom(process.env.REPLY_TO || "876devs@gmail.com");
            email.setText(req.body.body);
            email.setSubject(req.body.subject);
            email.setFromName('Tremaine Buchanan');

        sendgrid.send(email, function(err, json){
                if(err){
                    message.text = "Error Send Grid";
                } else{
                    message.text = "Emails sent successfully";
                    res.json(message);
                }
        });
    });
});
/**
 * Renders the email form
 */
router.get('/send', function(req, res){
   res.render('email');
});

module.exports = router;

