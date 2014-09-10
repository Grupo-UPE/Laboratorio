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

exports.create = function (req, res, next) {
    //Las verificaciones de los requeridos la hariamos desde angular.... por ahora.
    var username=req.body.username;
    var nombre=req.body.nombre;
    var apellido=req.body.apellido;
    var email=req.body.email;
    var legajo=req.body.legajo;
    var password=req.body.password;
    var cambiarpass=true;
    var roles=req.body.roles;

    var usuario=new Usuario({
        username:username,
        nombre:nombre,
        apellido:apellido,
        email:email,
        legajo:legajo,
        password:password,
        cambiarpass:cambiarpass,
        roles:roles,
    });
    usuario.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/usuarios')
        }
};

exports.list = function (req, res, next) {

    Usuario.find(gotUsuarios)

  function gotTextos (err, usuarios) {
    if (err) {
      console.log(err)
      return next()
    }
    /* Deberiamos utilizar un usuariodto o algo similar.
    No le veo mucho sentido a enviar toda la informacion del usuario.
    Me molesta, sobre todo, enviar el password, aunque esta hasheado
    */
    return res.json(usuarios);
  }

}

exports.show = function (req, res, next) {
  var id = req.params.id

  Texto.findById(id, gotUsuario)

  function gotTexto (err, usuario) {
    if (err) {
      console.log(err)
      return next(err)
    }
    var usuariodto={
                _id:usuario.id,
                username:usuario.nombre,
                roles:usuario.roles,
                nombre:usuario.nombre,
                apellido:usuario.apellido,
            }
    return res.json(usuariodto)
  }
};

exports.update = function (req, res, next) {

    var id = req.body._id
    var username=req.body.username;
    var nombre=req.body.nombre;
    var apellido=req.body.apellido;
    var email=req.body.email;
    var legajo=req.body.legajo;
    var password=req.body.password;
    var cambiarpass=true;
    var roles=req.body.roles;


  if ((username=== '')) {
    return res.send({'error':'Debe escribir algo'})
  }

    Usuario.findById(id, gotUsuario)

    function gotUsuario (err, usuario) {
        if (err) {
            return next(err)
        }
        if (!usuario) {
            return res.send({'error':'ID invalido'})
        } else {
            usuario.username=username;
            usuario.nombre=nombre;
            usuario.apellido=apellido;
            usuario.email=email;
            usuario.legajo=legajo;
            usuario.password=password;
            usuario.roles=roles;
            texto.save(onSaved)
        }
    }

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send('')
        }
}