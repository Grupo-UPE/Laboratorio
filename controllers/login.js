gapi = require('../lib/gapi');
var usuario  = require('../controllers/usuario')

exports.login = function(req, res) {
  var locals = {
        title: 'Login',
        url: gapi.url,
        nombre: 'UPE'
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
                req.session.usuario=rv;
            var locals={
                title:"Bienvenido!",
                nombre:"UPE",
                user:profile.displayName,
                imagen:profile.image.url,
                usuario:rv,
            }
            //console.log(rv);
            res.render('redirect.jade', locals);
        }else{
            var locals={
                nombre:"UPE",
                title:'Error en el Login',
                error:true
            }

            res.render('login.jade', locals);
        }
        });
        });
    });
}

exports.logout = function(req, res) {
    req.session.destroy();
    var locals = {
        title: 'Logout',
        url: gapi.url,
        nombre: 'UPE'
      };
    res.render('logout.jade', locals);
}