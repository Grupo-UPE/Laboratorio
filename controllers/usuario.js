var Usuario = require('../models/usuario'); //Traemos directamente el modelo
var Rol = require('../models/rol'); //Traemos directamente el modelo

/*
*   Pruebas para verficar que funcione
*
*
  var tonto = new Usuario({
    username   : 'username',
    nombre          :   'alguien',
    apellido           : 'ea ea pepe',
    legajo              : '123',
    password        :  '123456',
});

tonto.save();


Usuario.getAuthenticated('username', '12345', function(err, usuario, motivo) {
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
    var usr=req.body.usuario;
    var rolesid=[];
    //console.log(usr.roles);
    var arr = [];
    for (var id in usr.roles) {
        arr.push(usr.roles[id]["_id"]);
    }
    console.log(arr);
    //console.log(rolesid);

    var usuario=new Usuario({
        username:usr.username,
        nombre:usr.nombre,
        apellido:usr.apellido,
        email:usr.email,
        legajo:usr.legajo,
        password:usr.password,
        cambiarpass:true,
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

  Texto.findById(id, gotUsuario)

  function gotTexto (err, usuario) {
    if (err) {
      console.log(err)
      return next(err)
    }
    var usuariodto={
                _id:usuario._id,
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