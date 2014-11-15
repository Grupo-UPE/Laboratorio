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

exports.listarEntrevistasUsuario = function(req, res){

    Entrevista.find({entrevistador: req.session.usuario._id, //Entrevistas del usuario
                            fecha: {"$gte": new Date().setHours(0)}},gotEntrevistas) //con fecha mayor a hoy
                            .populate('postulante').populate('busqueda') //con los datos del entrevistador, el postulante y la busqueda.
      function gotEntrevistas (err, entrevistas) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(entrevistas);
  }
}

exports.listarEntrevistasFuturas = function(req, res){

    var date= new Date().setHours(0);
    var pasado=new Date()
    pasado.setTime(date + (7 * 24 * 60 * 60 * 1000)); //Le agrego 7 dias, en teoria.
   Entrevista.find({fecha: {"$gte": date, "$lt": pasado}},gotEntrevistas) //Con fecha mayor a hoy y menor a pasado mañana
                            .populate('entrevistador').populate('postulante').populate('busqueda') //con los datos del entrevistador, el postulante y la busqueda.
      function gotEntrevistas (err, entrevistas) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(entrevistas);
  }
}

exports.listarEntrevistasUsuarioSinFeedback = function(req, res){

    Entrevista.find({entrevistador: req.session.usuario._id, feedback: null, //Entrevistas del usuario sin feedback
                            fecha: {"$lt": new Date().setHours(23)}},gotEntrevistas) //con fecha menor a hoy a las 11 de la noche
                            .populate('entrevistador').populate('postulante').populate('busqueda') //con los datos del entrevistador, el postulante y la busqueda.
      function gotEntrevistas (err, entrevistas) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(entrevistas);
  }
}

exports.listarEntrevistasSinFeedback = function(req, res){
    //Todas las entrevistas de las que no tenemos feedback.
    Entrevista.find({fecha: {"$lt": new Date().setHours(23)}},gotEntrevistas) //con fecha menor a hoy a las 11 de la noche
                            .populate('entrevistador').populate('postulante').populate('busqueda') //con los datos del entrevistador, el postulante y la busqueda.
      function gotEntrevistas (err, entrevistas) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.json(entrevistas);
  }
}