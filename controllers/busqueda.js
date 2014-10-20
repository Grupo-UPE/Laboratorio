var Busqueda = require('../models/busqueda');
var Habilidad = require("../models/habilidad");
var Usuario = require("../models/usuario");
var Postulante = require("../models/postulante");

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
        estado              :'Cerrada',
        remuneracion        :bsq.remuneracion,
        habilidades         :lhab,
        otros_comentarios   :bsq.otros_comentarios,
        texto_twitter       :bsq.texto_twitter,
        lugar_trabajo       :bsq.lugar_trabajo,
        horario             :bsq.horario,
    });
    console.log(bsq.estado);
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

Busqueda.findById(id).lean().populate('habilidades').populate('entrevistadores').populate({path: 'postulantes'})
.exec(function (err, doc) {
    var options={
        path: 'postulantes.habilidades',
        model: 'Habilidad'
    };
    Busqueda.populate(doc, options, gotBusqueda);

    });

  function gotBusqueda (err, busqueda) {
    if (err) {
      console.log(err)
      return next(err)
    }
    return res.json(busqueda)
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

exports.update = function (req, res, next) {
    console.log(req.params.estado);
    var mongoose=require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.busqueda._id);
    //console.log(id);
    //console.log(id);
    var nombre=req.body.busqueda.nombre;
    var estados=req.body.busqueda.estado;
    var _id=mongoose.Types.ObjectId(req.body.busqueda._id);

    //console.log(usr.roles);
    var arr = [];
    for (var id in estados) {
        arr.push(estados[id]["_id"]);
    }


  if ((estados=== '')) {
    return res.send({'error':'Debe escribir algo'})
  }

    Busqueda.findById(_id, gotBusqueda);

    function gotBusqueda (err, busqueda) {
        if (err) {
            return next(err)
        }
        if (!busqueda) {
            return res.send({'error':'ID invalido'})
        } else {
            busqueda.nombre=nombre;
            busqueda.estado=arr;
            busqueda.save(onSaved)
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

exports.listabierta = function (req, res, next) {
  var estado = req.params.estado
  var query = Busqueda.where({estado : "Abierta"});

  query.findOne(function estado (err, busqueda) { 
    if (err) {
      console.log(err)
      return next(err)
    }
    return res.json(busqueda)
  }
)};