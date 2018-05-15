'use strict';

const BusinessNetworkConnection = require("composer-client").BusinessNetworkConnection;
const nodemailer = require('nodemailer');

var emailAddress = process.argv[2];
var emailPassword = process.argv[3];
if (emailAddress == null || emailPassword == null)
{
    console.log('Address and password for email required.');
    process.exit(-1);
}

var businessNetworkConnection = new BusinessNetworkConnection();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailAddress,
        pass: emailPassword
    }
});

// connects to business network and subscribes to events it emits
(async () =>
{
    await businessNetworkConnection.connect("admin@bond-marketplace");

    businessNetworkConnection.on("event", event =>
    {
        if (event.$type !== 'EmailEvent')
        {
            console.log("Unknown event received:\n" + event);
            return;
        }

        var mailBody = 'Freight invoice: $' + event.freightInvoice
            + '\nFreight commission: $' + event.freightCommission
            + '\nLoad demurrage: $' + event.loadDemurrage
            + '\nTotal demurrage: $' + event.totalDemurrage;

        // create generic email for all addresses
        let mailOptions = {
            from: 'team6.eventmail@gmail.com',
            subject: 'Invoice for voyage '
                + event.voyageNumber + ' is available',
            text: mailBody
        };

        // send an email to each given address
        event.emails.forEach(address =>
        {
            mailOptions.to = address;

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


    });

    console.log('Now listening for business network events...');
})();
