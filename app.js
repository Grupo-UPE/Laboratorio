var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var texto  = require('./controllers/texto')
var usuario  = require('./controllers/usuario')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
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
