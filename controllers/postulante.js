var Postulante = require('../models/postulante');
var fs = require('fs');
var ObjectId = require("mongoose").Types.ObjectId;

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
    }
    return res.send(postulante);

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
                fotoUrl             : postulante.fotoUrl,
                curriculumURL       : postulante.curriculumURL


            }


    return res.json(postulantedto)
  }
};

//actualizacion del postulante
exports.actualizar = function(){

}



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
        fs.unlinkSync(fotoUrl);
        fs.unlinkSync(curriculumURL);
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

exports.upload = function (req, res, next) {

    //res.setHeader('Content-Type', 'text/html');

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
            newPath_foto = '../public/uploads/fotos/' + nombre;
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

    /*for (var id in req.body.postulante.habilidades) {
        habilidades.push(req.body.postulante.habilidades[id]["_id"]);
    }*/




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


    /** CARGA CV */
    var path_tmp_cv = req.files.file.path;
        gapi.a.setCredentials(req.session.tokens);
        gapi.drive.files.insert({
          resource: {
            parents : [{id: '0B29paO-zxCaBZTVTZ0ZuMm00Y2M'}],
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
            newPath_cv = res.selfLink;

            try{
                postulante.curriculumURL = res.selfLink;
            }
            catch(err){
                console.log(err);
            }

            postulante.save(onSaved)
            fs.unlinkSync(path_tmp_cv);
        });

       function onSaved(err) {
        if (err) {
            console.log(err)
            return next(err)
        }

        return res.send("");
    }

        /*newPath_cv = '../public/uploads/curriculums/' + nombre + extension;
        var is = fs.createReadStream(path_tmp_cv)
        var os = fs.createWriteStream(newPath_cv)
        is.pipe(os)
        is.on('end', function() {//cuando no hay mas datos que leer
            fs.unlinkSync(path_tmp_cv) //eliminamos el archivo temporal
        })*/

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
    var dni = req.param('postulant.dni');
    if (!req.files.file || req.files.file.size == 0) {
      mensaje = 'No se pudo subir el archivo ' + new Date().toString();
      res.send(mensaje);
    }
    else{
        Postulante.findById(id, gotPostulante)
            function gotPostulante(err, postulante) {
                if (err) {
                    return next(err)
                }

                if (!postulante) {
                    return res.send({ 'error': 'ID invalido' })
                 }
                else {
                    var path_tmp_cv = req.files.file.path;
                    gapi.a.setCredentials(req.session.tokens);
                    gapi.drive.files.insert({
                      resource: {
                        parents : [{id: '0B29paO-zxCaBZTVTZ0ZuMm00Y2M'}],
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

                        return res.send("");
                        }
                                    
                }
}}};

exports.prueba = function(req, res, next){
    console.log(req.params);
}

exports.busca=function(res,req,next){
console.log("agregar");
};
