/**
 * Created by tremaine on 12/5/15.
 */
var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var Client = require('../models/client');

/**
 * Creates a client from the request body.
 */
router.post('/email', function(req, res){
    var message = '';
    Client.find().exec(function(err, client){
        if(err) {
            message = 'Error';
        }else{
            var from = process.env.REPLY_TO || "876devs@gmail.com",
                email = new sendgrid.Email({
                    to: client.email,
                    from: from,
                    subject: 'Testing Mailing Feature',
                    text: 'Hello World' + ' ' + client.name
                });

            sendgrid.send(email, function(err, json){
                if(err) message = 'Error, Send Grid';
            });
        }
        res.json('Message Sent');
    });
});

module.exports = router;

