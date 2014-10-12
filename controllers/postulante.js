var Postulante = require('../models/postulante');
var fs = require('fs');

exports.create = function (req, res, next) {

 /*
  var postulante = new Postulante({
  "nombre" : "Pepe",
  "apellido" : "Argento",
  "dni" : 123,
  "estado_civil" : "Soltero",
  "nacionalidad" : "Argentino",
  "edad" : "24",
  "sexo" : "m",
  "telefono" : [{
      "tipo" : "Celular",
      "numero" : "1535073886"
    }],
  "email" : "pepelapopa@gmail.com",
  "disponibilidad" : "fulltime",

  "comentario" : "texto de prueba",

});
postulante.save();
*/

    var nombre = req.body.postulante.nombre;
    var apellido = req.body.postulante.apellido;
    var dni = req.body.postulante.dni;
    var estado_civil = req.body.postulante.estado_civil;
    var nacionalidad = req.body.postulante.nacionalidad;
    var edad = req.body.postulante.edad;
    var sexo = req.body.postulante.sexo;
    var telefono = req.body.postulante.telefono;
    var email = req.body.postulante.email;
    var disponibilidad = req.body.postulante.disponibilidad;
     var habilidades=[];
    for (var id in req.body.postulante.habilidades) {
        habilidades.push(req.body.postulante.habilidades[id]["_id"]);
    }

    var comentario = req.body.postulante.comentario;

    var postulante = new Postulante({
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        estado_civil: estado_civil,
        nacionalidad: nacionalidad,
        edad: edad,
        sexo: sexo,
        telefono: telefono,
        email: email,
        disponibilidad: disponibilidad,
        comentario: comentario,
        habilidades : habilidades,

    });

    postulante.save(onSaved)

    function onSaved(err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send("");
    }

};

exports.list = function (req, res, next) {

    Postulante.find(gotPostulantes).populate('habilidades')

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

  function gotPostulante (err, postulante) {
    if (err) {
      console.log(err)
      return next(err)
    }


    var postulantedto={
                _id                 : postulante._id,
                nombre              : postulante.nombre,
                apellido            : postulante.apellido,
                dni                 : postulante.dni,
                estado_civil        : postulante.estado_civil,
                nacionalidad        : postulante.nacionalidad,
                edad                : postulante.edad,
                sexo                : postulante.sexo,
                telefono            : postulante.telefono,
                email               : postulante.email,
                disponibilidad      : postulante.disponibilidad,
                comentario          : postulante.comentario,
                habilidades         : postulante.habilidades,

            }
            console.log(postulantedto.edad);

    return res.json(postulantedto)
  }
};

//actualizacion del postulante

exports.update = function (req, res, next) {
    var mongoose=require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.postulante._id);
    var nombre = req.body.postulante.nombre;
    var apellido = req.body.postulante.apellido;
    var dni = req.body.postulante.dni;
    var estado_civil = req.body.postulante.estado_civil;
    var nacionalidad = req.body.postulante.nacionalidad;
    var edad = req.body.postulante.edad;
    var sexo = req.body.postulante.sexo;
    var telefono = req.body.postulante.telefono;
    var email = req.body.postulante.email;
    var edad = req.body.postulante.edad;
    var disponibilidad = req.body.postulante.disponibilidad;
    var comentario = req.body.postulante.comentario;
    var _id=mongoose.Types.ObjectId(req.body.postulante._id);

    Postulante.findById(_id, gotPostulante)

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
            postulante.disponibilidad = disponibilidad;
            postulante.comentario = comentario;
            postulante.habilidad = [];

            console.log(_id);
            console.log(id);
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

exports.remove = function (req, res, next) {
    var id = req.body.id;

    Postulante.findById(id, gotPostulante)

    function gotPostulante (err, postulante) {
    if (err) {
        console.log(err)
        return next(err)
    }

    if (!postulante) {
        return res.send({'error':'ID invalido'})
    }

    // Tenemos el texto, eliminemoslo
    postulante.remove(onRemoved)
  }

  function onRemoved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/')
  }
}

exports.upload = function (req, res) {

    var path = req.files.file.path;
    //seria el dni o el id del postulante
    var nombre = 'algo';
    var newPath = '../public/uploads/' + nombre;
    var is = fs.createReadStream(path)
    var os = fs.createWriteStream(newPath)
    is.pipe(os)
    //cuando no hay mas datos que leer
    is.on('end', function() {
    //eliminamos el archivo temporal
        fs.unlinkSync(path)
    })
    res.send('¡archivo subido!')

}