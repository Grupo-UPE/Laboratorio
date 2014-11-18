var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var nodemailer = require('nodemailer');
var multipart = require('connect-multiparty');
mongoose.connect('mongodb://localhost/test'); //Conectamos mongoose.

var routes = require('./routes/index');
//var users = require('./routes/users');
gapi = require('./lib/gapi');

//tagmanager = require('./node_modules/tagmanager/tagmanager');
var app = express();

var texto  = require('./controllers/texto')
var usuario  = require('./controllers/usuario')
var rol  = require('./controllers/rol')
var busqueda = require('./controllers/busqueda')
var busquedaBis = require('./controllers/busquedaBis')
var habilidad = require('./controllers/habilidad')

//var contacto = require('./controllers/contacto')
var contacto = require('./controllers/contacto')
var entrevista = require('./controllers/entrevista')
var texto  = require('./controllers/texto');
var usuario  = require('./controllers/usuario');
var buser = require('./controllers/buser');
var postulante = require('./controllers/postulante');

var busqueda = require('./controllers/busqueda');
var habilidad = require('./controllers/habilidad');
var busquedaBis = require('./controllers/busquedaBis')

var login = require('./controllers/login');
var calendar = require('./controllers/calendar');
var mail= require('./controllers/sendMail');
var bpostu = require('./controllers/postulante');

//Esto seria algo algo como el instalador.
var install = require('./controllers/install');


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

app.use(bodyParser());
app.use(multipart());

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
//app.post('/REST/create-rol',rol.create)
//app.post('/REST/delete-rol',rol.remove)

//rutas para los postulantes

app.get('/REST/postulante', postulante.list);
app.get('/REST/postulante/:id', postulante.show);
app.post('/REST/postulante', postulante.update);
app.post('/REST/delete-postulante', postulante.remove);
app.post('/REST/create-postulante', postulante.create);

//carga de archivo

app.post('/uploadImage', postulante.uploadImage);
app.post('/uploadDoc', postulante.uploadDoc);


//envio de mails
app.get('/send',mail.enviomail);
app.post('/send',mail.enviomail);

app.get('/REST/buser', buser.list);
app.post('/REST/buser', buser.list);

//busqueda de postulantes
app.get('/REST/bpostu', bpostu.busca);
app.post('/REST/bpostu', bpostu.busca);

//Rutas para busquedas
app.get('/REST/busquedaBis', busquedaBis.list)//Le puse el bis porque devuelve mas o menos lo que esperamos.
app.get('/REST/detalleBusquedaBis/:id', busquedaBis.show)
app.post('/REST/busquedaPorHabilidades', postulante.listarPorHabilidades)//Le puse el bis porque devuelve mas o menos lo que esperamos.

app.post('/REST/create-contacto', contacto.create)
app.get('/REST/contacto', contacto.list);
app.get('/REST/contacto/:postulante', contacto.listPostulante);

app.get('/REST/busqueda', busqueda.list)
app.get('/REST/busquedastate/:estado', busqueda.listabierta)
app.post('/REST/create-busqueda',busqueda.create)
app.post('/REST/delete-busqueda',busqueda.remove)
app.get('/REST/busqueda/:id', busqueda.show);
app.post('/REST/busqueda', busqueda.update);




app.post('/REST/asociarPostulante', busqueda.asociar);

//rutas para habilidades
app.get('/REST/habilidad', habilidad.list)
app.post('/REST/habilidad', habilidad.create)
app.post('/REST/delete-habilidad', habilidad.remove)
app.get('/REST/tags/:query', habilidad.query)



//Entrevistadores Autocomplete

app.get('/REST/entrevistadores/:queri', usuario.queri)


//Login
app.get('/login', login.login)
app.get('/oauth2callback', login.callback)
app.get('/logout', login.logout)

//Entrevistas
app.post('/REST/create-entrevista', calendar.create)
app.get('/entrevista', calendar.show)
app.get('/REST/entrevistas', entrevista.listarEntrevistas)
app.get('/REST/entrevistasUsuario', entrevista.listarEntrevistasUsuario)
app.get('/REST/entrevistasFuturas', entrevista.listarEntrevistasFuturas)
app.get('/REST/entrevistasUsuarioSinFeedback', entrevista.listarEntrevistasUsuarioSinFeedback)
app.get('/REST/entrevistasSinFeedback', entrevista.listarEntrevistasUsuarioSinFeedback)
app.post('/REST/guardarFeedback', entrevista.guardarFeedback)
app.get('/REST/entrevistaPostulante/:postulante', entrevista.listarEntrevistasPostulante)





//Install
app.get('/install',install.install)

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
app.get('/REST/estaLogueado', usuario.estaLogueado)

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



module.exports = app;
