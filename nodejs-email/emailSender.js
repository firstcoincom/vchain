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

            // event received, time to send email
            var mailOptions = {
                from: 'team6.eventmail@gmail.com',
                to: event.address,
                subject: event.subject,
                text: event.body
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
