var Usuario = require('../models/usuario');

var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/test'
  , db              = mongoose.createConnection(db_lnk)


  var usuario_schema = require('../models/usuario')
  , Usuario = db.model('Usuario', usuario_schema)

/*
*   Pruebas para verficar que funcione
*
*
  var tonto = new Usuario({
    username   : '1234',
    nombre          :   'nombe',
    apellido           : 'apellido',
    legajo              : '123',
    password        :  '1234',
});

tonto.save();


Usuario.getAuthenticated('123', '123', function(err, usuario, motivo) {
        if (err) throw err;

        // login was successful if we have a user
        if (usuario) {
            // handle login success
            console.log('login success');
            return;
        }
        console.log(motivo);
    });
*/

  exports.login = function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;


Usuario.getAuthenticated(username, password, function(err, usuario, motivo) {
        if (err) throw err;
        if (usuario) {
            var usuariodto={
                _id:usuario.id,
                username:usuario.nombre,
                roles:usuario.roles,
                nombre:usuario.nombre,
                apellido:usuario.apellido,
            }
            res.json(usuariodto);
        }else{
            res.writeHead(401)
        res.send();
        }

    });
};