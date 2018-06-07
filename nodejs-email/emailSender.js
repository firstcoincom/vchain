'use strict';
// imports
const BusinessNetworkConnection = require("composer-client").BusinessNetworkConnection;
const nodemailer = require('nodemailer');

// get email info from parameters
const emailAddress = process.argv[2];
const emailPassword = process.argv[3];
if (emailAddress == null || emailPassword == null)
{
    console.log('Address and password for email required.');
    process.exit(-1);
}

const businessNetworkConnection = new BusinessNetworkConnection();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailAddress,
        pass: emailPassword
    }
});

function sendMail(mailOptions)
{
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
}

// connects to business network and subscribes to events it emits
(async () =>
{
    await businessNetworkConnection.connect("admin@bond-marketplace");

    let mailOptions = {
        from: emailAddress
    };

    businessNetworkConnection.on("event", event =>
    {
        if (event.$type !== 'EmailEvent')
        {
            console.log("Unknown event received:\n" + event);
            return;
        }

        let freightInvoice = parseFloat(event.freightInvoice).toFixed(2);
        let freightCommission = parseFloat(event.freightCommission).toFixed(2);
        let loadDemurrage = parseFloat(event.loadDemurrage).toFixed(2);
        let totalDemurrage = parseFloat(event.totalDemurrage).toFixed(2);

        if (event.chartererEmail != null)
        {
            mailOptions.to = event.chartererEmail;

            mailOptions.subject = 'Invoice for voyage '
                + event.voyageNumber + '.';
            mailOptions.text = 'Freight invoice: $' + freightInvoice
                + '\nFreight commission: $' + freightCommission
                + '\nLoad demurrage: $' + loadDemurrage
                + '\nTotal demurrage: $' + totalDemurrage;

            sendMail(mailOptions);
        }

        if (event.voyageManagerEmail != null)
        {
            mailOptions.to = event.voyageManagerEmail;

            mailOptions.subject = 'Invoice for voyage '
                + event.voyageNumber + '.';
            mailOptions.text = 'Freight invoice: $' + freightInvoice
                + '\nFreight commission: $' + freightCommission
                + '\nLoad demurrage: $' + loadDemurrage
                + '\nTotal demurrage: $' + totalDemurrage;

            sendMail(mailOptions);
        }

        if (event.chartererEmail != null)
        {
            mailOptions.to = event.chartererEmail;

            mailOptions.subject = 'Invoice for voyage '
                + event.voyageNumber + '.';
            mailOptions.text = 'Freight invoice: $' + freightInvoice
                + '\nFreight commission: $' + freightCommission
                + '\nLoad demurrage: $' + loadDemurrage
                + '\nTotal demurrage: $' + totalDemurrage;

            sendMail(mailOptions);
        }
    });

    console.log('Now listening for business network events...');
})();
