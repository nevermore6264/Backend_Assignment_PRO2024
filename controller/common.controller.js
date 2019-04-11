'use strict';
var _ = require('lodash');
const configs = require('../config.json');
const axios = require('axios');
const translate = require('@vitalets/google-translate-api');

exports.verify_token = async function (req, res) {
    if (req.query['hub.verify_token'] === configs.verify_token) {
        console.log('Validate successfully');
        return res.send(req.query['hub.challenge']);
    }
    return res.send('Wrong validation');
}

async function send_message_to_facebook(recipient_id, message) {
    axios({
        method: 'POST',
        url: configs.facebook_messages_url,
        params: {
            access_token: configs.fanpage_token
        },
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            recipient: {
                id: recipient_id
            },
            message: {
                text: message
            }
        },
    }).then(function () {
        console.log("Send message to Facebook successfully!");
    })
        .catch(function (response) {
            console.log(response);
        });
}

exports.post_to_facebook = function (req, res) {
    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) {
                if (message.message.text) {
                    var text = message.message.text;
                    try {
                        send_message_to_facebook(senderId, text)
                    } catch (error) {
                        console.log('Error: ', error)
                    }
                }
            }
        }
    }
    return res.sendStatus(200)
}

exports.translate = function (req, res) {
    var content = req.body.content;
    translate(content, { to: 'en' }).then(res => {
        res.send(res.text);
        console.log(res.text);
        return "alo" + res.text;
    }).catch(err => {
        console.error(err);
    });
    return res.sendStatus(200)
}
