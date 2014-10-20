var Postulante = require('../models/postulante');
var fs = require('fs');
var ObjectId = require("mongoose").Types.ObjectId;

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

exports.upload = function (req, res, next) {

    res.setHeader('Content-Type', 'text/html');

    var mensaje = '';
    var nombre = req.param('postulante.dni');
    var extension = '';
    var newPath_cv='';
    var newPath_foto='';
    var tipo='';


    /* ---CARGA DEL CURRICULUM --------------*/

    if (!req.files.file || req.files.file.size == 0) {
      mensaje = 'No se pudo subir el archivo ' + new Date().toString();
      res.send(mensaje);
    }
    else{
        var path_tmp_cv = req.files.file.path;
        extension = '.pdf';
        newPath_cv = '../public/uploads/curriculums/' + nombre + extension;
        var is = fs.createReadStream(path_tmp_cv)
        var os = fs.createWriteStream(newPath_cv)
        is.pipe(os)
        is.on('end', function() {//cuando no hay mas datos que leer
            fs.unlinkSync(path_tmp_cv) //eliminamos el archivo temporal
        })

    }

    /* -------  CARGA DE LA FOTO  --------------*/
    tipo=req.files.foto.type;

    if (!req.files.foto || req.files.foto.size == 0) {
      mensaje = 'No se pudo subir el archivo ' + new Date().toString();
      res.send(mensaje);
    }
    else{
        if(tipo=='image/png' || tipo=='image/jpg' || tipo=='image/jpeg' ){
            var path_tmp_foto = req.files.foto.path;
            extension = ".jpg";
            newPath_foto = '../public/uploads/fotos/' + nombre + extension;
            is = fs.createReadStream(path_tmp_foto)
            os = fs.createWriteStream(newPath_foto)
            is.pipe(os)
            is.on('end', function() {
                fs.unlinkSync(path_tmp_foto)
            })

        }
        else{
             mensaje = 'Tipo de archivo no soportado';
             res.send(mensaje);
        }

    }

    /* ------CARGA DATOS EN LA BASE ------------*/
    //console.log(req.param('pustulante.habilidades'))

    var postulante = new Postulante({
        nombre: req.param('postulante.nombre'),
        apellido: req.param('postulante.apellido'),
        dni: req.param('postulante.dni'),
        estado_civil: req.param('postulante.estado_civil'),
        nacionalidad: req.param('postulante.nacionalidad'),
        edad: req.param('postulante.edad'),
        sexo: req.param('postulante.sexo'),
        telefono: req.param('postulante.telefono'),
        email: req.param('postulante.email'),
        disponibilidad: req.param('postulante.disponibilidad'),
        comentario: req.param('postulante.comentario'),
        habilidades : [],
        curriculumURL : newPath_cv,
        fotoUrl : newPath_foto
        });
    postulante.save(onSaved)

    function onSaved(err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send("");
    }

    res.send(JSON.stringify(postulante));
}
exports.listarPorHabilidades = function (req, res, next) {
    console.log(req.body.habilidades);
    var habs= [];
    for(var id in req.body.habilidades){
      habs.push({habilidades: req.body.habilidades[id]["_id"]});
    }

    console.log(habs);
    //habilidades:ObjectId('54392bf6bea750120a07e142')
    var b=Postulante.find({$or: habs},gotPostulantes).populate('habilidades')

    function gotPostulantes(err, postulantes) {
        if (err) {
            console.log(err)
            return next()
        }

        console.log(postulantes);
        //return res.json(postulante);
    }

/*
  Busqueda.findById(id).lean().populate('habilidades').populate('entrevistadores').populate({path: 'postulantes'}).exec(function (err, doc) {
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
    console.log(busqueda.postulantes);
        return res.json(busqueda);
  }
  */
};