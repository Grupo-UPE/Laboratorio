var nodemailer = require('nodemailer');
gapi = require('../lib/gapi');

exports.send = function(req, res) {
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
		to : "carlosrodriguez.upe@gmail.com",//req.query.to,
		subject : "hola",//req.query.subject,
		text : "hola",//req.query.text,
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