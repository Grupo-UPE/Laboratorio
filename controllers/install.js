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

exports.install = function(){
var roles=[{nombre:"nombre de rol", puntosdemenu:[{texto:"Texto a mostrar",anchor:"URL"},{texto:"",anchor:""}]}];
var administradores=['m@ail','otroM@ail'];
var rrhhs=[];
var entrevistadores=[];

var postulantes=[
    {
    nombre: 'fernando',
    apellido: 'lescano',
    dni: 31956641,
    estado_civil: 'soltero',
    nacionalidad: 'argentina',
    edad: 'mucha',
    sexo: 'poco',
    telefono: [{ tipo: 'mio', numero: 'alguno'}],
    email: 'alguno',
    formacion_academica: [{ titulo: 'tecnico universitario en desarrollo de software'}],
    disponibilidad: 'abierto a propuestas',
    experiiencia_laboral: [{ empresa: 'alguna', antiguedad: 'muy poca', rol: 'che pibe'}],
    comentario: 'depende del lenguaje... podria ser /* */',
    //habilidades     : [{type: Schema.ObjectId, ref : 'Habilidad'}],
    //habilidades_evaluadas     :
      //  [{habilidad: {type: Schema.ObjectId, ref : 'Habilidad'},Evaluacion:Number}],
//});
    }
];

var busquedas = [{
    cantidad_empleados       : 1,
    nombre         : 'Busqueda de prueba',
    abierto         : true,
    remuneracion    : 17500,
    entrevistadores     : [ObjectId('5421ee60dda3805b31d3e075'),
                                    ObjectId('5418b908976daf2e565c49e8')],
    postulantes     : [ObjectId('542c7447f412b91116e4adaf')],
    otros_comentarios : 'Un comentario para probar',
    texto_twitter     : 'Solo puede tener 140 caracteres',
    lugar_trabajo     : "En algun lado",
    horario           : "De 00:01 a 23:59"
}];

/*
var count = busquedas.length;
for(var i = 0; i < count; i++) { //Dicen que es mas rapido esto que for(var algo in lista)
    var bsq = new Busqueda(busquedas[i]);
    bsq.save();
}
*/
/*
var count = postulantes.length;
for(var i = 0; i < count; i++) { //Dicen que es mas rapido esto que for(var algo in lista)
    var post = new Postulante(postulantes[i]);
    post.save();
}
*/
var habilidades=[];
/*
var count = roles.length;
for(var i = 0; i < count; i++) { //Dicen que es mas rapido esto que for(var algo in lista)
    var rol = new Rol({
    nombre        :   roles[i].nombre,
    puntos_de_menu: roles[i].puntosdemenu,
    });
    rol.save();
}
*/



//Idem con las habilidades los administadores, los rrhs y los entrevistadores.
}
