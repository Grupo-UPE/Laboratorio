var Buser = require('../models/usuario');


exports.list = function (req, res, next) {

Buser.find(gotBusqueda)

  function gotBusqueda (err, usuario){
    if (err) {
      console.log(err)
      return next()
    }
    //console.log(JSON.stringify(usuario));
    return res.json(usuario);
  }

}
/*
email:usr.email,
        username:usr.username,
        roles:arr,*/

exports.show = function (req, res, next) {

  Seleccion.find({username:gotBusqueda})

  function gotSeleccion (err, usuario) {
    if (err) {
      console.log(err)
      return next(err)
    }
    var busquedadto={
                nombre:buser.username,
		rol:buser.roles,
                mail:buser.email,
                                
            }
    return res.json(busquedadto)
  }
};
