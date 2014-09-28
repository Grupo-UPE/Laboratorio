var Habilidad = require('../models/habilidad');

exports.create = function (req, res, next) {
    var nombre=req.body.habilidad;
    

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
