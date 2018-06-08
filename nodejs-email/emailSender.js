'use strict';
// imports
const BusinessNetworkConnection = require("composer-client").BusinessNetworkConnection;
const nodemailer = require('nodemailer');

// get gmail info from parameters
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

// handles console output for the transporter.sendMail function
function emailErrorHandler(error, info)
{
    if (error)
    {
        console.log(error);
    } else
    {
        console.log('Email sent: ' + info.response);
    }
}

// connects to business network and subscribes to events it emits
(async () =>
{
    await businessNetworkConnection.connect("admin@bond-marketplace");

    // start listening to business network
    businessNetworkConnection.on("event", event =>
    {
        if (event.$type !== 'EmailEvent')
        {
            console.log("Unknown event received:\n" + event);
            return;
        }

        // parse invoice values into two decimal points
        let freightInvoice = parseFloat(event.freightInvoice).toFixed(2);
        let freightCommission = parseFloat(event.freightCommission).toFixed(2);
        let loadDemurrage = parseFloat(event.loadDemurrage).toFixed(2);
        let totalDemurrage = parseFloat(event.totalDemurrage).toFixed(2);

        // ideally, each customized email should be parsing a seperate text file
        // this is just a basic version to show that each email is unique

        if (event.chartererEmail != null)
        {
            let mailOptions = {
                from: emailAddress,
                to: event.chartererEmail,
                subject: 'Invoice for voyage ' + event.voyageNumber + '.',
                html: '<span style="color:rgb(255,0,0)">'
                    + '<font size="4"><b>Invoice for voyage ' + event.voyageNumber + '.</b></font>'
                    + '<br/>Freight invoice: $' + freightInvoice
                    + '<br/>Freight commission: $' + freightCommission
                    + '<br/>Load demurrage: $' + loadDemurrage
                    + '<br/>Total demurrage: $' + totalDemurrage
                    + '</span>'
            };

            transporter.sendMail(mailOptions, emailErrorHandler);
        }

        if (event.voyageManagerEmail != null)
        {
            let mailOptions = {
                from: emailAddress,
                to: event.voyageManagerEmail,
                subject: 'Invoice for voyage ' + event.voyageNumber + '.',
                html: '<span style="color:rgb(0,255,0)">'
                    + '<font size="4"><b>Invoice for voyage ' + event.voyageNumber + '.</b></font>'
                    + '<br/>Freight invoice: $' + freightInvoice
                    + '<br/>Freight commission: $' + freightCommission
                    + '<br/>Load demurrage: $' + loadDemurrage
                    + '<br/>Total demurrage: $' + totalDemurrage
                    + '</span>'
            };

            transporter.sendMail(mailOptions, emailErrorHandler);
        }

        if (event.shippingCompanyEmail != null)
        {
            let mailOptions = {
                from: emailAddress,
                to: event.shippingCompanyEmail,
                subject: 'Invoice for voyage ' + event.voyageNumber + '.',
                html: '<span style="color:rgb(0,0,255)">'
                    + '<font size="4"><b>Invoice for voyage ' + event.voyageNumber + '.</b></font>'
                    + '<br/>Freight invoice: $' + freightInvoice
                    + '<br/>Freight commission: $' + freightCommission
                    + '<br/>Load demurrage: $' + loadDemurrage
                    + '<br/>Total demurrage: $' + totalDemurrage
                    + '</span>'
            };

            transporter.sendMail(mailOptions, emailErrorHandler);
        }
    });

    console.log('Now listening for business network events...');
})();
