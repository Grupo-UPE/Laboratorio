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

/* USUARIO */
services.factory('UsuarioFactory', function ($resource) {
	return $resource('/tracker/rest/usuario/:id', {}, {
        show: { method: 'GET' },
        remove: { method: 'DELETE' },
        update: { method: 'PUT' },
        create: { method: 'POST' },
        query: { method: 'GET', params: {}, isArray: true },
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
