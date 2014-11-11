var Rol = require('../models/rol'); //Traemos directamente el modelo

/*
*
*Cremos dos roles para probar.
*
var admin = new Rol({
    nombre        :   'admin',
    puntos_de_menu: [{ url:'#/usuarios', anchor:'Administracion Usuarios' },{url:'#/prueba',anchor:'Prueba'}],
});
admin.save();

var rrhh = new Rol({
    nombre        :   'rrhh',
    puntos_de_menu: [{}],
});
rrhh.save();
var entrevistador = new Rol({
    nombre        :   'entrevistador',
    puntos_de_menu: [{}],
});
entrevistador.save();
*/

exports.list = function (req, res, next) {

    Rol.find(gotRoles)

  function gotRoles (err, roles) {
    if (err) {
      console.log(err)
      return next()
    }
  //Deberiamos un dto de roles. Pero por ahora sirve.
    return res.json(roles);
  }

}




exports.create = function (req, res, next) {
    var nombre=req.body.rol.nombre;


    var roles = new Rol({
  nombre: nombre,
  });  

    roles.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send("");
        }
};

exports.remove = function (req, res, next) {
    var id = req.body.id

    Rol.findById(id, gotRoles)

    function gotRoles (err, roles) {
    if (err) {
        console.log(err)
        return next(err)
    }

    if (!roles) {
        return res.send({'error':'ID invalido'})
    }

    // Tenemos el texto, eliminemoslo
    roles.remove(onRemoved)
  }

  function onRemoved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/')
  }
}