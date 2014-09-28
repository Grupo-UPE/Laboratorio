gapi = require('../lib/gapi');
var usuario  = require('../controllers/usuario')

exports.login = function(req, res) {
  var locals = {
        title: 'Login',
        url: gapi.url
      };
  res.render('login.jade', locals);
}

exports.callback = function(req, res) {
  var code = req.query.code;
    gapi.a.getToken(code, function(err, tokens) {
        gapi.a.setCredentials(tokens);
        req.session.tokens=tokens;
        gapi.b.people.get({ userId: 'me', auth: gapi.a }, function(err, profile) {
        if (err) {
            console.log('An error occured', err);
            return;
        }
        //console.log(profile); //El usuario se logueo, en teoria.
        var email=profile.emails;
        usuario.login(email[0].value,function(rv){//rv=Return Value
            if(typeof rv != 'undefined'){
                req.session.token=code;
                //req.session=session;
                //req.session.gapi=gapi;
                //console.log(req.session.usuario);
            var locals={
                title:"Bienvenido!",
                usuario:rv,
            }
            //console.log(rv);
            res.render('redirect.jade', locals);
        }else{
            var locals={
                title:'Error en el Login',
            }

            res.render('login.jade', locals);
        }
        });
        });
    });
}