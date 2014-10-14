var Contacto = require('../models/contacto');
exports.create = function (req, res) {

    console.log(req.body);


    var contacto = new Contacto({
    comentario: req.body.comentario,
    postulante: req.body.postulante
    });
    console.log(req.body.comentario)
    console.log(contacto);

    contacto.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send("");
        }
};

exports.list = function (req, res, next) {

    Contacto.find(gotContactos).populate('postulante')

  function gotContactos (err, contactos) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(contactos);
  }
}


exports.listPostulante=function(req,res){
    console.log(req.params.postulante);
    Contacto.find({postulante: req.params.postulante},gotContactos)

    //Supongo que se podria usar una sola funcion gotContactos para todos...
  function gotContactos (err, contactos) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(contactos);
  }
}