'use strict';

/* Services */

/*
 http://docs.angularjs.org/api/ngResource.$resource

 Default ngResources are defined as

 'get':    {method:'GET'},
 'save':   {method:'POST'},
 'query':  {method:'GET', isArray:true},
 'remove': {method:'DELETE'},
 'delete': {method:'DELETE'}

 */

var services = angular.module('ngdemo.services', ['ngResource']);

/* USUARIO
Lo dejo para consultar.
services.factory('UsuarioFactory', function ($resource) {
	return $resource('/tracker/rest/usuario/:id', {}, {
        show: { method: 'GET' },
        remove: { method: 'DELETE' },
        update: { method: 'PUT' },
        create: { method: 'POST' },
        query: { method: 'GET', params: {}, isArray: true },
    });
});
*/
//Prueba para de googleapis
services.factory('google', function ($resource) {
    return $resource('/REST/algo/', {}, {
        query: { method: 'GET', params: {}, isArray: false }, //trae todos los usuarios
    });
});

/*Usuarios*/
/*
Si tuvieramos los metodos put y delete quedaria mas prolijo
*/
services.factory('usuarioService', function ($resource) {
    return $resource('/REST/usuario/', {}, {
        query: { method: 'GET', params: {}, isArray: true }, //trae todos los usuarios
    });
});
services.factory('usuarioCreateService', function ($resource) {
    return $resource('/REST/create-usuario/', {}, {
        create: { method: 'POST' },
    });
});
services.factory('usuarioShowUpdateService', function ($resource) {
    return $resource('/REST/usuario/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'POST' },
    });
});
services.factory('usuarioRemoveService', function ($resource) {
    return $resource('/REST/delete-texto/:id', {}, {
        remove: { method: 'POST' },
    });
});

/* Usuarios */
services.factory('rolService', function ($resource) {
    return $resource('/REST/rol/', {}, {
        query: { method: 'GET', params: {}, isArray: true }, //trae todos los usuarios
    });
});

//ROLES
/*
services.factory('rolCreateService', function ($resource) {
    return $resource('/REST/rol/create/', {}, {
        create: { method: 'POST' }, //trae todos los usuarios
    });
});
*/
/*Postulantes */

services.factory('postulanteService', function ($resource) {
    return $resource('/REST/postulante', {}, {
        query: { method: 'GET', params: {}, isArray: true }, //trae todos los postulantes
    });
});

services.factory('postulantePaginadoService', function ($resource) {
    return $resource('/REST/postulante/pagina/:pagina', {}, {
        query: { method: 'GET', params: {}, isArray: true }, //trae todos los postulantes
    });
});

services.factory('postulanteCreateService', function ($resource) {
    return $resource('/REST/create-postulante/', {}, {
        create: { method: 'POST' },
    });
});

services.factory('postulanteRemoveService', function ($resource) {
    return $resource('/REST/delete-postulante/:id', {}, {
        remove: { method: 'POST' },
    });
});

services.factory('postulanteShowUpdateService', function ($resource) {
    return $resource('/REST/postulante/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'POST' },
    });
});

/*Textos*/
services.factory('textoservice', function ($resource) {
    return $resource('/REST/texto/', {}, {
        create: { method: 'POST' },
        query: { method: 'GET', params: {}, isArray: true },
    });
});

services.factory('textocreate', function ($resource) {
    return $resource('/REST/create-texto/', {}, {
        create: { method: 'POST' },
    });
});

/* Textos por id */
services.factory('textoserviceid', function ($resource) {
	return $resource('/REST/texto/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'POST' },
    });
});

services.factory('textoremove', function ($resource) {
    return $resource('/REST/delete-texto/:id', {}, {
        remove: { method: 'POST' },
    });
});

/*Busquedas*/

services.factory('busquedaService', function ($resource) {
    return $resource('/REST/busqueda/:pagina', {}, {
        query: { method: 'GET', params: {}, isArray: true },
    });
});
services.factory('busquedaServiceState', function ($resource) {
    return $resource('/REST/busquedastate/:estado', {}, {
        query: { method: 'GET', params: {}, isArray: true },
    });
});

services.factory('busquedaCreateService', function ($resource) {
    return $resource('/REST/create-busqueda', {}, {
        create: { method: 'POST' },
    });
});

services.factory('busquedaRemove', function ($resource) {
    return $resource('/REST/delete-busqueda/:id', {}, {
        remove: { method: 'POST' },
    });
});

services.factory('busquedaShowUpdateService', function ($resource) {
    return $resource('/REST/busqueda/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'POST'},
    });
});


services.factory('posiblesPostulantes', function ($resource) {
    return $resource('/REST/busquedaPorHabilidades', {}, {
        query: { method: 'POST', params: {}, isArray: true },
    });
});

services.factory('asociarPostulante', function ($resource) {
    return $resource('/REST/asociarPostulante/', {}, {
        asociar: { method: 'POST' },
    });
});

//DetalleDeBusqueda
services.factory('detalleBusquedaService', function ($resource) {
    return $resource('/REST/detalleBusquedaBis/:id', {}, {
        query: { method: 'GET', params: {}, isArray: false },
    });
});

//Contacto
services.factory('contactoCreateService', function ($resource) {
    return $resource('/REST/create-contacto/', {}, {
        create: { method: 'POST' },
    });
});

services.factory('contactoPostulanteListService', function ($resource) {
    return $resource('/REST/contacto/:postulante', {}, {
        query: { method: 'GET', params: {}, isArray: true },
    });
});

//Entrevistas
services.factory('entrevistaCreateService', function ($resource) {
    return $resource('/REST/create-entrevista/', {}, {
        create: { method: 'POST' },
    });
});

/*Habilidades*/


services.factory('habilidadCreateService', function ($resource) {
    return $resource('/REST/habilidad', {}, {
        create: { method: 'POST' },
        query: { method: 'GET', params: {}, isArray: true },
    });
});
services.factory('habilidadService', function ($resource) {
    return $resource('/REST/habilidad', {}, {
        query: { method: 'GET', params: {}, isArray: true },
    });
});

services.factory('habilidadRemove', function ($resource) {
    return $resource('/REST/delete-habilidad/:id', {}, {
        remove: { method: 'POST' },
    });
});

//Para verificar el login
services.factory('estaLogueado', function ($resource) {
    return $resource('/REST/estaLogueado/', {}, {
        query: { method: 'GET', params: {}, isArray: false }, //trae todos los usuarios
    });
});


//bpostulante
services.factory('bpostuService', function ($resource) {
    return $resource('/REST/bpostu/:texto', {}, {
        query: { method: 'GET', params: {}, isArray: false }, //trae todos los usuarios
    });
});

services.factory('AuthService', function ($http, Session,$rootScope) {
  var authService = {};

  authService.login = function (credenciales) {
    return $http
      .post('/login', credenciales)
      .then(function (res) {
        //$rootScope.usr=res;
        Session.create(res.data._id,
                       res.data.username,res.data.rol);
        return res.data;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session._id;
  };

  return authService;
})

.service('Session', function () {
  this.create = function (_id, username,rol) {
    this._id = _id;
    this.username = username;
    this.rol = rol;
  };
  this.destroy = function () {
    this._id = null;
    this.username = null;
    this.rol = null;
  };
  return this;
});

services.factory('controlAcceso', function () {
    this.puedeAcceder=function(usr,roles){
     if(roles.indexOf(usr.rol) !== -1){ //Si el usuario tiene el rol suficiente para acceder
        return true;
     }else{
        return false;
     }
    }
    return this;
});

//Busqueda de usuarios

services.factory('buserService', function ($resource) {
    return $resource('/REST/buser', {}, {
        query: { method: 'GET', params: {}, isArray: true },
    });
});


services.factory('entrevistasUsuario', function ($resource) {
    return $resource('/REST/entrevistasUsuario', {}, {
        query: { method: 'GET' , params: {}, isArray: true },
    });
});

services.factory('entrevistasFuturas', function ($resource) {
    return $resource('/REST/entrevistasFuturas', {}, {
        query: { method: 'GET' , params: {}, isArray: true },
    });
});

services.factory('entrevistasUsuarioSinFeedback', function ($resource) {
    return $resource('/REST/entrevistasUsuarioSinFeedback', {}, {
        query: { method: 'GET' , params: {}, isArray: true },
    });
});

services.factory('entrevistasSinFeedback', function ($resource) {
    return $resource('/REST/entrevistasSinFeedback', {}, {
        query: { method: 'GET' , params: {}, isArray: true },
    });
});

services.factory('guardarFeedback', function ($resource) {
    return $resource('/REST/guardarFeedback', {}, {
        guardar: { method: 'POST' },
    });
});
services.factory('entrevistaPostulante', function ($resource) {
    return $resource('/REST/entrevistaPostulante/:postulante', {}, {
        query: { method: 'GET' , params: {}, isArray: true },
    });
});

services.factory('totalBusquedas', function ($resource) {
    return $resource('/REST/totalBusquedas/:estado', {}, {
        get: { method: 'GET' , params: {}, isArray: false },
    });
});

services.factory('totalPostulantes', function ($resource) {
    return $resource('/REST/totalPostulantes/:estado', {}, {
        get: { method: 'GET' , params: {}, isArray: false },
    });
});

services.factory('habillidadesPostulante', function ($resource) {
    return $resource('/REST/habillidadesPostulante/:postulante', {}, {
        get: { method: 'GET' , params: {}, isArray: true },
    });
});

