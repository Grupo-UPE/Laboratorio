/*
Instalador de la aplicacion
Version 0.0.0.2
Se supone que lo vamos a utilizar  crear la base de datos y meterle la primer informacion por ejemplo mail del administradorr.
Tambien la vamos a utilizar para meter los datos "invariables" como los roles (y las rutas permitidas que tienen)
y un primer set de habilidad, que luego el administrador (o quien sea) pueda agregar mas.
*/
var mongoose = require('mongoose');
var ObjectId = require("mongoose").Types.ObjectId;
var Usuario = require('../models/usuario'); //Traemos directamente el modelo
var Rol = require('../models/rol'); //Traemos directamente el modelo
var Postulante = require('../models/postulante');
var Busqueda = require('../models/busqueda');
var Habilidad = require('../models/habilidad');
var config = require('../config/config');

exports.install = function(req, res){
var roles=[{nombre:"admin"},{nombre:"rrhh"},{nombre:"entrevistador"}];
var administrador=config.ADMIN;
var rrhh=config.RRHH;
var entrevistador=config.ENTREVISTADOR;
var habilidades = config.HABILIDADES;

var rolAdmin = new Rol({
    nombre        :   "admin"
    });
rolAdmin.save();

var rolRRHH = new Rol({
    nombre        :   "rrhh"
    });
rolRRHH.save();

var rolEntrevistador = new Rol({
    nombre        :   "entrevistador"
    });
rolEntrevistador.save();

var admin = new Usuario({
    email: administrador.email,
    username: administrador.username,
    rol: rolAdmin._id,
});
admin.save();

var rrhh = new Usuario({
    email: rrhh.email,
    username: rrhh.username,
    rol: rolRRHH._id,
});
rrhh.save();

var entrevistador = new Usuario({
    email: entrevistador.email,
    username: entrevistador.username,
    rol: rolEntrevistador._id,
});
entrevistador.save();

//Creamos las habilidades
var count = habilidades.length;
for(var i = 0; i < count; i++) { //Dicen que es mas rapido esto que for(var algo in lista)
    var habilidad = new Habilidad({
        nombre: habilidades[i]
    });
    habilidad.save();
}

res.render('install.jade', '');

}
