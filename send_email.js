/*
 * dmail
 *
 * Christian Beedgen (christian@sumologic)
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 */

//
// Send the dmail.
//

var transportSpec = process.argv[2];
var filename = process.argv[3];
var url = process.argv[4];
var dashboardId = process.argv[5];
var sender = process.argv[6];
var receiver = process.argv[7];
var subject = process.argv[8];

var dashboardUrl = url + "/ui/dashboard.html?k=" + dashboardId + "&t=r";

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(transportSpec);
var uniqueID = "schnitzel" + Date.now();
var mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    text: dashboardUrl + "\n\n" + 'Please enable HTML in your email client.\n',
    html: '<a href="' + dashboardUrl + '">' + dashboardUrl + '</a>' +
    '<br><br>' +
    '<img src="cid:' + uniqueID + '"/>',
    attachments: [{
        filename: filename,
        path: filename,
        cid: uniqueID
    }]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
