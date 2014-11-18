var Busqueda = require('../models/busqueda');
var Habilidad = require("../models/habilidad");
var Usuario = require("../models/usuario");
var Postulante = require("../models/postulante");

exports.create = function (req, res, next) {
    //Las verificaciones de los requeridos la hariamos desde angular.... por ahora.
    var bsq=req.body.busqueda;
    var usr=req.body.usuario;
    var lhab= [];
    for(var id in bsq.habilidades){
      lhab.push(bsq.habilidades[id]["_id"]);
    }
    var lentrevistadores= [];
    for(var id in bsq.entrevistadores){
      lentrevistadores.push(bsq.entrevistadores[id]["_id"]);
    }



    var busqueda= new Busqueda({
        fecha_inicio        :bsq.fecha_inicio,
        entrevistadores       :lentrevistadores,
        cantidad_empleados  :bsq.cantidad_empleados,
        nombre              :bsq.nombre,
        estado              :'Abierta',
        remuneracion        :bsq.remuneracion,
        habilidades         :lhab,
        otros_comentarios   :bsq.otros_comentarios,
        texto_twitter       :bsq.texto_twitter,
        lugar_trabajo       :bsq.lugar_trabajo,
        horario             :bsq.horario,
        empleado_referente  :bsq.empleado_referente,

    });
    console.log(bsq.estado);
    console.log(busqueda);
  //    console.log("creamos la busqueda y nos queda: ");
  //  console.log(busqueda);

    busqueda.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/#/createbusquedas')
        }
};



exports.list = function (req, res, next) {
    var skip=0;
    var limit=5;
    if(req.params.pagina){
        skip=(req.params.pagina-1)*5;
        total=(req.param.pagina)*5;
    }

    Busqueda.find().skip(skip).limit(limit).populate('postulantes').populate('entrevistadores').populate('habilidades')
    .exec(function(err, busquedas){
        if (err) {
            console.log(err)
            return next()
            }
            return res.json(busquedas);
            });
}

exports.totalBusquedas = function (req, res, next) {

    if(req.params.estado){
        Busqueda.find({estado: req.params.estado}).count()
        .exec(function(err, total){
            if (err) {
                console.log(err)
                return next()
             }
                return res.json({total:total});
        });
    }else{
    Busqueda.count()
    .exec(function(err, total){
        if (err) {
            console.log(err)
            return next()
            }
            return res.json({total:total});
            });
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
    var mongoose=require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.busqueda._id);
    var estado=req.body.busqueda.estado;
    var _id=mongoose.Types.ObjectId(req.body.busqueda._id);


  if ((estado=== '')) {
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

            busqueda.estado=estado;
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

//populate('habilidades')
exports.listabierta = function (req, res, next) {
  var estado = req.params.estado

  Busqueda.find({estado: req.params.estado}, gotBusqueda).populate('habilidades');

function gotBusqueda (err, busqueda) {
    if (err) {
        console.log(err)
        return next(err)
    }
    return res.json(busqueda);
}
    /*
    function estado (err, busqueda) {
    if (err) {
      console.log(err)
      return next(err)
    }
    return res.json(busqueda)
  }*/
};

exports.asociar = function (req, res, next) {
    var mongoose=require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.id);

    var postulantes = req.body.postulantes;

    Busqueda.findById(id, gotBusqueda);

        function gotBusqueda (err, busqueda) {
            if (err) {
                return next(err)
            }
            if (!busqueda) {
                return res.send({'error':'ID invalido'})
            } else {
                for (var i = 0; i < postulantes.length; i++) {
                    busqueda.postulantes.push(postulantes[i]._id);
                };
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
