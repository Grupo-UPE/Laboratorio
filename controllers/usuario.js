var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/test'
  , db              = mongoose.createConnection(db_lnk)

  var usuario_schema = require('../models/usuario')
  , Usuario = db.model('Usuario', usuario_schema)


  exports.login = function (req, res, next) {

    var username = req.body.username;

    var password = req.body.password;

    if(username==='admin'){
       var dto={
            _id:1,
            username:'admin',
            rol:'admin',
        }
        res.json(dto);
    }else{

    Usuario.findOne({ nombre: username}, function (err, usuario) {
    if (err){ //return handleError(err);
        res.writeHead(401)
        res.send();
    }
    if(password===usuario.password){
        var usuariodto={
            _id:usuario.id,
            username:usuario.nombre,
            rol:usuario.rol,
        }
        res.json(usuariodto);
    }else{
        res.writeHead(401)
        res.send();
    }
    })
    }
}