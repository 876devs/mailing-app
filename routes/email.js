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
    var from = process.env.REPLY_TO || "do_not_reply@gmail.com";
    var email = new sendgrid.Email({
        to: 'tremainekbuchanan@gmail.com',
        from: from,
        subject: 'Testing Mailing Feature',
        text: 'Hello World'
    });

    sendgrid.send(email, function(err, json){
       if(err) res.json({message: 'Email not sent'});
        console.log(json);
        res.json({message: "Sent successfully"});
    });
});

module.exports = router;

