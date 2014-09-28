/*
Instalador de la aplicacion
Version 0.0.0.1
Se supone que lo vamos a utilizar  crear la base de datos y meterle la primer informacion por ejemplo mail del administradorr.
Tambien la vamos a utilizar para meter los datos "invariables" como los roles (y las rutas permitidas que tienen)
y un primer set de habilidad, que luego el administrador (o quien sea) pueda agregar mas.
*/
var Usuario = require('../models/usuario'); //Traemos directamente el modelo
var Rol = require('../models/rol'); //Traemos directamente el modelo

var roles=[{nombre:"nombre de rol", puntosdemenu:[{texto:"Texto a mostrar",anchor:"URL"},{texto:"",anchor:""}];
var administradores=['m@ail','otroM@ail'];
var rrhhs=[];
var entrevistadores=[];

var habilidades=[];

var count = roles.length;
for(var i = 0; i < count; i++) { //Dicen que es mas rapido esto que for(var algo in lista)
    var rol = new Rol({
    nombre        :   roles[i].nombre,
    puntos_de_menu: roles[i].puntosdemenu,
    });
    rol.save();
}

//Idem con las habilidades los administadores, los rrhs y los entrevistadores.

