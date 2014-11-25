var nodemailer = require('nodemailer');
gapi = require('../lib/gapi');

exports.enviomail = function(req, res, next) {


    gapi.b.people.get({ userId: 'me', auth: gapi.a }, function(err, profile) {
    if (err) {
        console.log('An error occured', err);
        return;
    }
    //console.log(profile); //El usuario se logueo, en teoria.
    var email=profile.emails;

    var smtpTransport = nodemailer.createTransport("SMTP",{
       service: "Gmail",
    auth: {
        XOAuth2: {
                user: email[0].value,
                clientId: gapi.a.clientId_,
                clientSecret: gapi.a.clientSecret_,
                refreshToken: gapi.a.credentials.id_token,
                accessToken: gapi.a.credentials.access_token
            }
        }
    });
        var mailOptions={
            from: email[0].value,
            to : req.body.to,
            subject : req.body.subject,
            text : req.body.content,
        }
        console.log(mailOptions);

        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                res.end("error");
            }else{
                console.log("Message sent: " + response.message);
                res.end("sent");
            }
        });
     });
}