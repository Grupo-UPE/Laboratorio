var Postulante = require('../models/postulante');
var fs = require('fs');
var ObjectId = require("mongoose").Types.ObjectId;
var config = require('../config/config')

exports.create = function (req, res, next) {

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
        fotoUrl : false

    });

    postulante.save(onSaved)

    function onSaved(err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send(postulante);
    }

};

exports.list = function (req, res, next) {
    var skip=0;
    var limit=5;
    if(req.params.pagina){
        skip=(req.params.pagina-1)*5;
        total=(req.param.pagina)*5;
    }

    Postulante.find().skip(skip).limit(limit).populate('habilidades')
    .exec(function(err, postulantes){
        if (err) {
            console.log(err)
            return next()
            }
            return res.json(postulantes);
            });
};

exports.totalPostulantes = function (req, res, next) {

    if(req.params.estado){
        Postulante.find({estado: req.params.estado}).count()
        .exec(function(err, total){
            if (err) {
                console.log(err)
                return next()
             }
                return res.json({total:total});
        });
    }else{
    Postulante.count()
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
  Postulante
    .findOne({ _id: id })
    .populate('habilidades')
    .exec(function (err, postulantedto) {
        if (err) return handleError(err);
        return res.json(postulantedto)
    })
};




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

    Postulante
    .findOne({ _id: id })
    .populate('habilidades')
    .exec(function (err, postulantedto) {
        if (err) return handleError(err);
        return res.json(postulantedto)
  
    })



    Postulante.findById(_id, gotPostulante)

    function gotPostulante(err, postulante) {
        if (err) {
            return next(err)
        }

        if (!postulante) {
            return res.send({ 'error': 'ID invalido' })
        }

         else {
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

    var curriculumURL =postulante.curriculumURL
    var fotoUrl = postulante.fotoUrl

    try{
        fs.unlinkSync('../public/uploads/fotos/' + postulante._id);

    }
    catch(err){
        console.log(err);
    }


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


exports.listarPorHabilidades = function (req, res, next) {
    var habs= [];
    var habId=[];
    for(var id in req.body.habilidades){
        habId.push(req.body.habilidades[id]["_id"]);
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

        var postulantesPuntuados=[]; //{postulante,coincidencias,puntaje}
        var habilidadesPunteadas=habId.reverse();
        var puntos=0;
        var listaHabilidades=[]

        for (var i = 0; i < postulantes.length; i++) {//Cada postulante
            for(var j=0; j<habilidadesPunteadas.length; j++){ //Cada habilidad recibida
                for(var t=0; t<postulantes[i].habilidades.length; t++){ //Cada habilidad individual de cada postulante
                    if(postulantes[i].habilidades[t]._id==habilidadesPunteadas[j]){ //Si coinciden lo meto dentro del lsitado
                        puntos=puntos+(j+1);
                        listaHabilidades.push(postulantes[i].habilidades[t]);
                    }
                }
            }
            postulantesPuntuados.push({postulante:postulantes[i],coincidencias:listaHabilidades,puntaje:puntos}); //postulante, array de coincidencias, puntaje
            puntos=0;
            listaHabilidades=[];
        };
        //console.log( postulantesPuntuados.sort(function(a, b){return b.puntaje-a.puntaje}));
        return res.json(postulantesPuntuados.sort(function(a, b){return b.puntaje-a.puntaje}));
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

exports.uploadImage = function(req, res, next){

    var id = req.param('postulant._id');
    var dni = req.param('postulant.dni');
    tipo=req.files.foto.type;

    if (!req.files.foto || req.files.foto.size == 0) {
      mensaje = 'No se pudo subir el archivo ' + new Date().toString();
      res.send(mensaje);
    }
    else{
        if(tipo=='image/png' || tipo=='image/jpg' || tipo=='image/jpeg' ){
            var path_tmp_foto = req.files.foto.path;
            var newPath_foto = '../public/uploads/fotos/' + id;
            //var newPath_foto = './public/uploads/fotos/' + id;
            is = fs.createReadStream(path_tmp_foto)
            os = fs.createWriteStream(newPath_foto)
            is.pipe(os)
            is.on('end', function() {
                fs.unlinkSync(path_tmp_foto)
            })

            Postulante.findById(id, gotPostulante)

            function gotPostulante(err, postulante) {
                if (err) {
                    return next(err)
                }

                if (!postulante) {
                    return res.send({ 'error': 'ID invalido' })
                 }

                else {
                    postulante.fotoUrl = true;
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
        else{
             mensaje = 'Tipo de archivo no soportado';
             res.send(mensaje);
        }

    }
}






exports.uploadDoc = function(req,res,next){
    var id = req.param('postulant._id');
    //var dni = req.param('postulant.dni');
    if (!req.files.file || req.files.file.size == 0) {
      mensaje = 'No se pudo subir el archivo ' + new Date().toString();
      res.send(mensaje);
    }
    else{
        Postulante.findById(req.body.id, gotPostulante)
            function gotPostulante(err, postulante) {
                if (err) {
                    return next(err)
                }

                if (!postulante) {
                    console.log(req.body.id)
                    return res.send({ 'error': 'ID invalido' })
                 }
                else {
                    try{


                    var path_tmp_cv = req.files.file.path;
                    gapi.a.setCredentials(req.session.tokens);
                    gapi.drive.files.insert({
                      resource: {
                        parents : [{id: config.GOOGLE_DRIVE}],
                        title: req.files.file.name,
                        mimeType: 'application/pdf'
                      },
                      media: {
                        mimeType: 'application/pdf',
                        body: fs.createReadStream(path_tmp_cv) // read streams are awesome!
                      }, auth: gapi.a
                    }, function(err, res){
                        if(err){
                            console.log(err);
                        }

                        try{
                            postulante.curriculumURL = res.webContentLink;
                        }
                        catch(err){
                            console.log(err);
                        }

                        postulante.save(onSaved);
                        fs.unlinkSync(path_tmp_cv);
                    });
                       function onSaved(err) {
                        if (err) {
                            console.log(err)
                            return next(err)
                        }

                        return res.redirect('/#/postulantes/reload')
                        }

                }catch(err){
                    return res.send('error: '+  err)
                }
            }
}}};


exports.busca = function (req, res, next) {

	var name = req.body.nombre;
	var apell = req.body.apellido;
	var email = req.body.email;

Postulante.find({
    "$or": [{
        "nombre": name
    }, {
        "apellido": apell
    }, {
        "email": email
    }]
}, gotPostulante);
  function gotPostulante (err, postulante) {
    if (err) {
      console.log(err)
      return next(err)
    }

   return res.json(postulante)
  }
};

exports.getHabilidades = function (req, res, next) {
  var id = req.params.postulante

  Postulante.findById(id, gotPostulante).populate('habilidades')

  function gotPostulante (err, postulante) {
    if (err) {
      console.log(err)
      return next(err)
   }


    return res.json(postulante.habilidades)
  }
};
