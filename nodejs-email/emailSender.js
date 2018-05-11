'use strict';

const BusinessNetworkConnection = require("composer-client").BusinessNetworkConnection;
const nodemailer = require('nodemailer');

this.businessNetworkConnection = new BusinessNetworkConnection();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'team6.eventmail@gmail.com',
        pass: 'DemurrageVolumesDisport'
    }
});

this.businessNetworkConnection.connect("admin@bond-marketplace")
    .then(() =>
    {
        this.businessNetworkConnection.on("event", event =>
        {
            if (event.$type !== 'EmailEvent')
            {
                console.log("Unknown event received:\n" + event);
                return Promise.resolve();
            }

            // create mail list string by appending given addresses
            var mailList = '';
            event.emails.forEach(element =>
            {
                mailList += element + ',';
            });

            // create generic email for all addresses
            var mailOptions = {
                from: 'team6.eventmail@gmail.com',
                to: mailList,
                subject: 'Invoice for voyage '
                    + event.voyageNumber + ' is available',
                text: ''
            };

            transporter.sendMail(mailOptions, function (error, info)
            {
                if (error)
                {
                    console.log(error);
                } else
                {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    })
    .catch(function (error)
    {
        throw error;
    });
