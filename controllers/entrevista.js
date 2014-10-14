var Entrevista = require('../models/entrevista');

exports.listarEntrevistas = function(req, res){

    Entrevista.find({postulante: req.session.usuario.id},gotEntrevistas)
      function gotEntrevistas (err, entrevistas) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(entrevistas);
  }
}