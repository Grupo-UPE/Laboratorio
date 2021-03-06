var Habilidad = require('../models/habilidad');

exports.create = function (req, res, next) {
    var nombre=req.body.habilidad.nombre;


    var habilidad = new Habilidad({
	nombre: nombre,
	});  

    habilidad.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send("");
        }
};

exports.list = function (req, res, next) {

    Habilidad.find(gotHabilidades)

  function gotHabilidades (err, habilidades) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(habilidades);
  }

}

exports.query = function (req, res, next) {

    var re = new RegExp(req.params.query,'i');

    Habilidad.find({nombre:re},gotHabilidades)

  function gotHabilidades (err, habilidades) {
    console.log(habilidades);
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(habilidades);
  }

}

exports.remove = function (req, res, next) {
    var id = req.body.id

    Habilidad.findById(id, gotHabilidad)

    function gotHabilidad (err, habilidad) {
    if (err) {
        console.log(err)
        return next(err)
    }

    if (!habilidad) {
        return res.send({'error':'ID invalido'})
    }

    // Tenemos el texto, eliminemoslo
    habilidad.remove(onRemoved)
  }

  function onRemoved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/')
  }
}
