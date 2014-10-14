var Busqueda = require('../models/busqueda');
var Habilidad = require("../models/habilidad");


exports.create = function (req, res, next) {
    //Las verificaciones de los requeridos la hariamos desde angular.... por ahora.
    var bsq=req.body.busqueda;
    var lhab= [];
    for(var id in bsq.habilidades){
      lhab.push(bsq.habilidades[id]["_id"]);
    }
    var lentrevistadores= [];
    for(var id in lentrevistadores.entrevistadores){
      lentrevistadores.push(lentrevistadores.entrevistadores[id]["_id"]);
    }

    var busqueda= new Busqueda({
        fecha_inicio        :bsq.fecha_inicio,
        Entrevistador       :lentrevistadores,
        cantidad_empleados  :bsq.cantidad_empleados,
        nombre              :bsq.nombre,
        abierto             :true,
        remuneracion        :bsq.remuneracion,
        habilidades         :lhab,
        otros_comentarios   :bsq.otros_comentarios,
        texto_twitter       :bsq.texto_twitter,
        lugar_trabajo       :bsq.lugar_trabajo,
        horario             :bsq.horario,
    });

//    console.log("creamos la busqueda y nos queda: ");
  //  console.log(busqueda);

    busqueda.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/createbusquedas')
        }
};


exports.list = function (req, res, next) {

    Busqueda.find(gotBusquedas).populate('postulantes').populate('entrevistadores').populate('habilidades')

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
                entrevistador:busqueda.entrevistadores,
                habilidades:busqueda.habilidades,
                fecha:busqueda.fecha,
                otros_comentarios:busqueda.otros_comentarios,
                horario:busqueda.horario,
                cantidad_empleados:busqueda.cantidad_empleados,
                remuneracion:busqueda.remuneracion,
                habilidades:busqueda.lhab,
                texto_twitter:busqueda.texto_twitter,
                lugar_trabajo:busqueda.lugar_trabajo,
                //postulantes:  busqueda.postulantes,


            }
    return res.json(busquedadto)
  }
};


exports.remove = function (req, res, next) {
    var id = req.body.id

    Busqueda.findById(id, gotBusqueda)

    function gotBusqueda (err, busqueda) {
    if (err) {
        console.log(err)
        return next(err)
    }

    if (!busqueda) {
        return res.send({'error':'ID invalido'})
    }

    // Tenemos el texto, eliminemoslo
    busqueda.remove(onRemoved)
  }

  function onRemoved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/')
  }
}
