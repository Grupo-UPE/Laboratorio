var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')
mongoose.connect('mongodb://localhost/test'); //Conectamos mongoose.

var routes = require('./routes/index');
//var users = require('./routes/users');
gapi = require('./lib/gapi');
//tagmanager = require('./node_modules/tagmanager/tagmanager');
var tags= require('./public/js/ui-bootstrap/bootstrap-tagsinput');
var app = express();

var texto  = require('./controllers/texto')
var usuario  = require('./controllers/usuario')
var rol  = require('./controllers/rol')
var busqueda = require('./controllers/busqueda')
var habilidad = require('./controllers/habilidad')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views')
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',
                            cookie: { maxAge: 12*60*60*1000 },
                            saveUninitialized: true,
                            resave: true}));
app.use(express.static(path.join(__dirname, 'public')));


//Se debe poder definirlas en otro lado
app.get('/REST/texto', texto.index)
app.get('/REST/texto/:id', texto.show_edit)
app.post('/REST/texto', texto.update)
app.post('/REST/delete-texto', texto.remove)
app.post('/REST/create-texto', texto.create)
//app.use('/', routes);
app.post('/login', usuario.login)

//Rutas para los usuarios
app.get('/REST/usuario', usuario.list)
app.get('/REST/usuario/:id', usuario.show)
app.post('/REST/usuario', usuario.update)
//app.post('/REST/delete-usuario', usuario.remove)
app.post('/REST/create-usuario', usuario.create)

//Rutas para roles.
app.get('/REST/rol', rol.list)


//Rutas para busquedas

app.get('/REST/busqueda', busqueda.list)
app.post('/REST/create-busqueda',busqueda.create)

//rutas para habilidades
app.get('/REST/habilidad', habilidad.list)
app.post('/REST/habilidad', habilidad.create)


//Login... por ahora esta aca porque es mas de prueba que otra cosa.
app.get('/login', function(req, res) {
  var locals = {
        title: 'Login',
        url: gapi.url
      };
  res.render('login.jade', locals);
});


app.get('/oauth2callback', function(req, res) {
  var code = req.query.code;
    gapi.a.getToken(code, function(err, tokens) {
        gapi.a.setCredentials(tokens);
        gapi.b.people.get({ userId: 'me', auth: gapi.a }, function(err, profile) {
        if (err) {
            console.log('An error occured', err);
            return;
        }
        //console.log(profile); //El usuario se logueo, en teoria.
        var email=profile.emails;
        usuario.login(email[0].value,function(rv){//rv=Return Value
            if(typeof rv != 'undefined'){
                //req.session=session;
                rv.token=code; //le meto el token en el usuario.
                rv.save;
                req.session.usuario=rv;
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
});

//Prueba de googleapis
app.get('/REST/algo', function(req, res) {
    gapi.b.people.get({ userId: 'me', auth: gapi.a }, function(err, profile) {
        if (err) {
            console.log('An error occured', err);
            return;
        }
        //console.log(profile); //El usuario se logueo, en teoria.
        res.json(profile);
    });
});

//Login
app.get('/REST/estaLogueado', usuario.estaLogueado);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//app.use($()



module.exports = app;
