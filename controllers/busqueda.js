var Busqueda = require('../models/busqueda');

var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/test'
  , db              = mongoose.createConnection(db_lnk)


  var busqueda_schema = require('../models/busqueda')
  , Busqueda = db.model('Busqueda', busqueda_schema)


exports.create = function (req, res, next) {
    //Las verificaciones de los requeridos la hariamos desde angular.... por ahora.
    var bsq=req.body.busqueda;

    var busqueda=new Busqueda({
        fecha:bsq.fecha,
        id_empleado:bsq.id_empleado,
        cantidad_empleados:bsq.cantidad_empleados,
        nombre:bsq.nombre,
        abierto:true,
        remuneracion:bsq.remuneracion,
        habilidades:bsq.habilidades,
        otros_comentarios:bsq.otros_comentarios,
        texto_twitter:bsq.texto_twitter,
        lugar_trabajo:bsq.lugar_trabajo,
        horario:bsq.horario,
    });

    console.log("Generamos la busqueda y nos queda: ");
    console.log(busqueda);

    //busqueda.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/busqueda')
        }
};


exports.list = function (req, res, next) {

    Busqueda.find(gotBusqueda)

  function gotBusqueda (err, busquedas) {
    if (err) {
      console.log(err)
      return next()
    }
    console.log(JSON.stringify(busquedas));
    return res.json(busquedas);
  }

}

exports.show = function (req, res, next) {
  var id = req.params.id

  Seleccion.findById(id, gotBusqueda)

  function gotSeleccion (err, busqueda) {
    if (err) {
      console.log(err)
      return next(err)
    }
    var busquedadto={
                _id:busqueda.id_empleado,
                nombre:busqueda.nombre,
                habilidades:busqueda.habilidades,
                fecha:busqueda.fecha,
                otros_comentarios:busqueda.otros_comentarios,
                horario:busqueda.horario,
            }
    return res.json(busquedadto)
  }
};
