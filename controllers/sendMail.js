var nodemailer = require('nodemailer');
gapi = require('../lib/gapi');

exports.enviomail = function(req, res, next) {
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
auth: {
	XOAuth2: {        
			user: "desarrollotest80@gmail.com",         
			clientId: gapi.a.clientId_,        
			clientSecret: gapi.a.clientSecret_,       
			//refreshToken: '1/CpHTWNfFhG56KoLXcYTfu3KKevknDovZGpPtOPXvW0EMEudVrK5jSpoR30zcRFq6',//req.session.tokens.token,
			refreshToken: gapi.a.credentials.id_token,         
			accessToken: gapi.a.credentials.access_token             
		}    
	}  
});
    
	var mailOptions={
		to : req.body.to,
		subject : req.body.subject,
		text : req.body.content,
		generateTextFromHTML: true,
  		html: "<b>Hello world</b>"
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

};