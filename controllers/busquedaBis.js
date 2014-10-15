/* BusquedaBis paa no pisar lo que esta haciendo pablo
despues deberiamos mergear los 2 archivos*/
var Busqueda = require('../models/busqueda');
var Habilidad = require("../models/habilidad");
var Usuario = require("../models/usuario");
var Postulante = require("../models/postulante");

exports.list = function (req, res, next) {

    Busqueda.find(gotBusquedas).populate('postulantes').populate('entrevistadores')

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


  Busqueda.findById(id).lean().populate({path: 'postulantes'}).exec(function (err, doc) {
    var options={
        path: 'postulantes.habilidades',
        model: 'Habilidad'
    };
    Busqueda.populate(doc, options, gotBusqueda);

    /*console.log("a");
    for(var i=0; i<doc.postulantes.lenght; i++){
        doc.postulantes[i].populate('habilidades');
        console.log(doc.postulantes[i].habiliadades);
    }*/
    });


  function gotBusqueda (err, busqueda) {
    if (err) {
      console.log(err)
      return next(err)
    }
    console.log(busqueda.postulantes);
        return res.json(busqueda);
  }
};
