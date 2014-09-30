var Postulante = require('../models/postulante');

/*JSON del Postulante:

{
  "nombre" : "name",
  "apellido" : "lastname",
  "dni" : 123,
  "estado_civil" : "Soltero",
  "nacionalidad" : "Argentino",
  "edad" : "24",
  "sexo" : "m",
  "telefono" : [{
      "tipo" : "Celular",
      "numero" : "1535073886"
    }],
  "email" : "sergio3886@gmail.com",
  "formacion_academica" : [{
      "titulo" : "analista de mujeres"
    }],
  "disponibilidad" : "fulltime",
  "experiiencia_laboral" : [{
      "empresa" : "upe",
      "antiguedad" : "3",
      "rol" : "junior"
    }],
  "comentario" : "texto de prueba",
  "habilidades" : [{
      "tecnologia" : "java",
      "categoria" : "junior"
    }]
}*/

exports.create = function (res, req, next) {
    
    
    
    var _postulante = new Postulante({
        nombre: req.body.post.nombre,
        apellido: postulante.apellido,
        dni: postulante.dni,
        estado_civil: postulante.estado_civil,
        nacionalidad: postulante.nacionalidad,
        edad: postulante.nacionalidad,
        sexo: postulante.sexo,
        telefono: postulante.telefono,
        email: postulante.email,
        formacion_academica: postulante.formacion,
        disponibilidad: postulante.formacion,
        experiencia_laboral: postulante.experiencia,
        comentario: postulante.comentario,
        habilidades : postulante.habilidad

    });

    _postulante.save(onSaved)

    function onSaved(err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send("");
    }
};

exports.list = function (req, res, next) {

    Postulante.find(gotPostulantes)

    function gotPostulantes(err, postulante) {
        if (err) {
            console.log(err)
            return next()
        }

        return res.json(postulante);
    }

};

exports.show = function (req, res, next) {
  var id = req.params.id

  Postulante.findById(id, gotPostulante)

  function gotPostulante (err, _postulante) {
    if (err) {
      console.log(err)
      return next(err)
    }
    var postulantedto={
                _id                 : _postulante._id,
                nombre              : _postulante.nombre,
                apellido            : _postulante.apellido,
                dni                 : _postulante.dni,
                estado_civil        : _postulante.estado_civil,
                nacionalidad        : _postulante.nacionalidad,
                edad                : _postulante.nacionalidad,
                sexo                : _postulante.sexo,
                telefono            : _postulante.telefono,
                email               : _postulante.email,
                formacion_academica : _postulante.formacion,
                disponibilidad      : _postulante.disponibilidad,
                experiencia_laboral : _postulante.experiencia,
                comentario          : _postulante.comentario,
                habilidad           : _postulante.habilidad,
                
            }
    return res.json(postulantedto)
  }
};

//actualizacion del postulante

exports.update = function (req, res, next) {

    var id = req.body._id
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var dni = req.body.dni;
    var estado_civil = req.body.estado_civil;
    var nacionalidad = req.body.nacionalidad;
    var edad = req.body.edad;
    var sexo = req.body.sexo;
    var telefono = req.body.telefono;
    var email = req.body.email;
    var edad = req.body.edad;
    var formacion_academica = req.body.formacion_academica;
    var experiencia = req.body.experiencia;
    var disponibilidad = req.body.disponibilidad;
    var comentario = req.body.comentario;



    if ((dni === '')) {
        return res.send({ 'error': 'Debe escribir algo' })
    }

    Postulante.findById(id, gotPostulante)

    function gotPostulante(err, postulante) {
        if (err) {
            return next(err)
        }
        if (!postulante) {
            return res.send({ 'error': 'ID invalido' })
        } else {
            postulante.nombre = nombre;
            postulante.apellido = apellido;
            postulante.dni = dni;
            postulante.estado_civil = estado_civil;
            postulante.nacionalidad = nacionalidad;
            postulante.edad = edad;
            postulante.sexo = sexo;
            postulante.telefono = telefono;
            postulante.email = email;
            postulante.formacion_academica = formacion_academica;
            postulante.disponibilidad = disponibilidad;
            postulante.experiencia = experiencia;
            postulante.comentario = comentario;
            postulante.habilidad = habilidad;

            postulante.save(onSaved)
        }
    }

    function onSaved(err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send('')
    }
}