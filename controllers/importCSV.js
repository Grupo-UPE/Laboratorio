var mongoose = require('mongoose');
var csv = require('ya-csv');
var Postulante = require('../models/postulante');
var Habilidad = require('../models/habilidad');
var fs = require('fs');


exports.parseo = function(req, res) {
      
var PostuList = fs.readFileSync(req.files.filecsv.path).toString().split('\n');
PostuList.shift(); // Shift the headings off the list of records.
    
function createDocRecurse (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    if (PostuList.length>1) {
        //quito titulos del archivo
        var line = PostuList.shift();
        var habilidadObject=[];     
        var csvParser=line.split(';');
        var habilidadParser=csvParser[11].split(',');

        habilidadParser.forEach(function(habi,i){
            Habilidad.find({nombre:habi},function (err, habilidades){
                 if (err) {
                      console.log('Fallo la creacion de habilidad: '+err)
                      //return next()
                    }
                if(habilidades==''){
                    var habilidad = new Habilidad({
                            nombre: habi,
                        }); 

                    habilidad.save();
                }
            });
        });

        Habilidad.find({nombre:{$in:habilidadParser}},gotHabilidades)
                function gotHabilidades (err, habilidades) {
                    if (err) {
                      console.log('Fallo la busqueda de habilidades'+err)
                      //return next()
                    }
                    for (var id in habilidades) {
                        habilidadObject.push(habilidades[id]["_id"]);
                    }

                    var doc = new Postulante({
                    nombre: csvParser[0],
                    apellido: csvParser[1],
                    dni: csvParser[2],
                    estado_civil: csvParser[3],
                    nacionalidad: csvParser[4],
                    edad: csvParser[5],
                    sexo: csvParser[6],
                    telefono: csvParser[7],
                    email: csvParser[8],
                    disponibilidad: csvParser[9],
                    comentario: csvParser[10],
                    habilidades : habilidadObject,
                    fotoUrl : false
                    });

                     if(csvParser[0]!=''){
                       doc.save(createDocRecurse);
                     }
                }

    } else {
        // Al final retorno
        res.redirect('http://127.0.0.1:3000/#/postulantes');
    }
}

createDocRecurse(null);
}
