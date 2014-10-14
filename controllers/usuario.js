var Usuario = require('../models/usuario'); //Traemos directamente el modelo
var Rol = require('../models/rol'); //Traemos directamente el modelo

/*
*   Pruebas para verficar que funcione
*

  var tonto = new Usuario({
    email   : 'pabloz18ezeiza@gmail.com',
});

tonto.save();

Usuario.acceder('pabloz18ezeiza@gmail.com',function(err,usuario,motivo){
    if(err) throw err;
    if(usuario){
        console.log('SUCESS');
        return;
    }
    console.log(motivo);
});

/**/

exports.estaLogueado=function(req, res) {
    if(typeof req.session.tokens != 'undefined'){
        return res.json(true);
    }else{
        res.writeHead(401, {
        "Content-Type": "text/plain"
        });
        res.end("No autorizado.");
    }
}

  exports.login = function (email,callback) {
Usuario.acceder(email, function(err, usuario, motivo) {
        if (err) throw err;
        if (usuario) {
            console.log("Retornando usuario");
            callback(usuario);
        }else{
            callback('undefined');
        }
    });
}

exports.create = function (req, res, next) {
    //Las verificaciones de los requeridos la hariamos desde angular.... por ahora.
    var email=req.body.email;
    var username=req.body.username;
    var rolesid=[];
    //console.log(usr.roles);
    var arr = [];
    for (var id in usr.roles) {
        arr.push(usr.roles[id]["_id"]);
    }

    var usuario=new Usuario({
        email:usr.email,
        username:usr.username,
        roles:arr,
    });

    usuario.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send("");
        }
};

exports.list = function (req, res, next) {

    Usuario.find(gotUsuarios).populate('roles')

  function gotUsuarios (err, usuarios) {
    if (err) {
      console.log(err)
      return next()
    }
    //console.log(listaUsrs);
    /* Deberiamos utilizar un usuariodto o algo similar.
    No le veo mucho sentido a enviar toda la informacion del usuario.
    Me molesta, sobre todo, enviar el password, aunque esta hasheado
    */
    //console.log(JSON.stringify(usuarios));
    return res.json(usuarios);
  }

}

exports.show = function (req, res, next) {
  var id = req.params.id

  Usuario.findById(id, gotUsuario)

  function gotUsuario (err, usuario) {
    if (err) {
      console.log(err)
      return next(err)
    }
    var usuariodto={
                _id:usuario._id,
                username:usuario.username,
                email:usuario.email,
                roles:usuario.roles,
            }
    return res.json(usuariodto)
  }
};
/*
exports.tag = function (req, res, next) {

    var re = new RegExp(req.params.tag,'i');

    Rol.find({nombre:re},gotRoles)

  function gotRoles (err, roles) {
    console.log(roles);
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(roles);
  }

}
*/
exports.update = function (req, res, next) {
    console.log(req.body.usuario);
    var mongoose=require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.usuario._id);
    //console.log(id);
    //console.log(id);
    var username=req.body.usuario.username;
    var email=req.body.usuario.email;
    var roles=req.body.usuario.roles;
    var _id=mongoose.Types.ObjectId(req.body.usuario._id);

    //console.log(usr.roles);
    var arr = [];
    for (var id in roles) {
        arr.push(roles[id]["_id"]);
    }


  if ((email=== '')) {
    return res.send({'error':'Debe escribir algo'})
  }

    Usuario.findById(_id, gotUsuario);

    function gotUsuario (err, usuario) {
        if (err) {
            return next(err)
        }
        if (!usuario) {
            return res.send({'error':'ID invalido'})
        } else {
            usuario.username=username;
            usuario.email=email;
            usuario.roles=arr;
            usuario.save(onSaved)
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