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
