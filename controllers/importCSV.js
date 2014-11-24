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
console.log(PostuList.length);
    if (PostuList.length>1) {
        //quito titulos del archivo
        var line = PostuList.shift();
        var habilidad=[];     
        var algo=line.split(';');

        var viene=['JAVA','SQL','java'];
        viene.forEach(function(habi,i){
            Habilidad.find({nombre:habi},function (err, habilidades){
                if(habilidades==''){
                    var habilidad = new Habilidad({
                            nombre: habi,
                        });  
                    habilidad.save();
                }
            });
        });

        Habilidad.find({nombre:{$in:viene}},gotHabilidades)
                function gotHabilidades (err, habilidades) {
                    if (err) {
                      console.log(err)
                      //return next()
                    }
                    for (var id in habilidades) {
                        habilidad.push(habilidades[id]["_id"]);
                    }

                    var doc = new Postulante({
                    nombre: algo[0],
                    apellido: algo[1],
                    dni: algo[2],
                    estado_civil: algo[3],
                    nacionalidad: algo[4],
                    edad: algo[5],
                    sexo: algo[6],
                    telefono: algo[7],
                    email: algo[8],
                    disponibilidad: algo[9],
                    comentario: algo[10],
                    habilidades : habilidad,
                    fotoUrl : false
                    });

                     if(algo[0]!=''){
                       doc.save(createDocRecurse);
                     }
                }

    } else {
        // After the last entry query to show the result.
        //queryAllEntries();
        console.log('termino');
        res.redirect('http://127.0.0.1:3000/#/postulantes');
    }
}

createDocRecurse(null);
}
