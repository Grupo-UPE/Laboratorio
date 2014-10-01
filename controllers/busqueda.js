var Busqueda = require('../models/busqueda');
var Habilidad = require("../models/habilidad");

/*
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/test'
  , db              = mongoose.createConnection(db_lnk)


  var busqueda_schema = require('../models/busqueda')
  , Busqueda = db.model('Busqueda', busqueda_schema)
*/

exports.create = function (req, res, next) {
    //Las verificaciones de los requeridos la hariamos desde angular.... por ahora.
    var bsq=req.body.busqueda;
    var lhab= [];
    for(var id in Habilidad.id){
      lhab.push(Habilidad.id[id]["_id"]);
    }

    var busqueda= new Busqueda({
        fecha:bsq.fecha,
        id_empleado:bsq.id_empleado,
        cantidad_empleados:bsq.cantidad_empleados,
        nombre:bsq.nombre,
        abierto:true,
        remuneracion:bsq.remuneracion,
        habilidades:lhab,
        otros_comentarios:bsq.otros_comentarios,
        texto_twitter:bsq.texto_twitter,
        lugar_trabajo:bsq.lugar_trabajo,
        horario:bsq.horario,
    });

    console.log("creamos la busqueda y nos queda: ");
    console.log(busqueda);

    busqueda.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/busqueda')
        }
};


exports.list = function (req, res, next) {

    Busqueda.find(gotBusquedas)

  function gotBusquedas (err, busquedas) {
    if (err) {
      console.log(err)
      return next()
    }
    //console.log(JSON.stringify(busquedas));
    return res.json(busquedas);
  }

}

exports.show = function (req, res, next) {
  var id = req.params.id

  Busqueda.findById(id, gotBusqueda)

  function gotBusqueda (err, busqueda) {
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
                cantidad_empleados:busqueda.cantidad_empleados,
                remuneracion:busqueda.remuneracion,
                habilidades:busqueda.lhab,
                texto_twitter:busqueda.texto_twitter,
                lugar_trabajo:busqueda.lugar_trabajo,

            }
    return res.json(busquedadto)
  }
};
