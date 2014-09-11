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
    return $resource('/REST/texto/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'POST' },
    });
});
services.factory('usuarioRemoveService', function ($resource) {
    return $resource('/REST/delete-texto/:id', {}, {
        remove: { method: 'POST' },
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