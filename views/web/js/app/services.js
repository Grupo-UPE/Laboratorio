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

/* USUARIO LIST */
services.factory('UsuarioListFactory', function ($resource) {
    return $resource('/tracker/rest/usuario/page', {}, {
    	 query: { method: 'POST', isArray: true },
    });
});

/* Lista Textos */
services.factory('listatextos', function ($resource) {
    return $resource('/REST/texto', {}, {
         query: { method: 'GET', isArray: true },
    });
});

/* CARRERA */
services.factory('CarreraFactory', function ($resource) {
	return $resource('/tracker/rest/carrera/:id', {}, {
        show: { method: 'GET' },
        remove: { method: 'DELETE' },
        update: { method: 'PUT' },
        create: { method: 'POST' },
        query: { method: 'GET', params: {}, isArray: true },
    });
});

/* CARRERA LIST */
services.factory('CarreraListFactory', function ($resource) {
    return $resource('/tracker/rest/carrera/page', {}, {
    	 query: { method: 'POST', isArray: true },
    });
});

/* Lista de Planes */
services.factory('PlanListFactory', function ($resource) {
    return $resource('/tracker/rest/plan/page', {}, {
    	 query: { method: 'POST', isArray: true },
    });
});

/* Lista de Planes */
services.factory('Quien', function ($resource) {
    return $resource('/tracker/rest/usuario/quienes', {}, {
    	 query: { method: 'GET' },
    });
});

services.factory('FactoryBusquedaAlumnoDNI', function ($resource) {
    return $resource('/tracker/rest/alumno/pordni/:d', {}, {
    	 buscarPorDNI: { method: 'GET', isArray: true },
    });
});

services.factory('FactoryBusquedaExamenPorAlumno', function ($resource) {
    return $resource('/tracker/rest/examenFinal/poralumno/:ida', {}, {
    	 buscarPorAlumno: { method: 'GET', isArray: true },
    });
});

services.factory('FactoryBusquedaMateriaPorExamen', function ($resource) {
    return $resource('/tracker/rest/materia/porexamen/:ide', {}, {
    	 buscarPorExamen: { method: 'GET', isObject: true },
    });
});

/* ALUMNO */
services.factory('AlumnoFactory', function ($resource) {
	return $resource('/tracker/rest/alumno/:id', {}, {
        show: { method: 'GET' },
        remove: { method: 'DELETE' },
        update: { method: 'PUT' },
        create: { method: 'POST' },
        query: { method: 'GET', params: {}, isArray: true },
    });
});

/* Profesor */
services.factory('ProfesorFactory', function ($resource) {
	return $resource('/tracker/rest/docente/:id', {}, {
        show: { method: 'GET' },
        remove: { method: 'DELETE' },
        update: { method: 'PUT' },
        create: { method: 'POST' },
        query: { method: 'GET', params: {}, isArray: true },
    });
});

services.factory('CursosPorUsuario', function ($resource) {
    return $resource('/tracker/rest/curso/porusuario/:id', {}, {
    	 buscar: { method: 'GET', isArray: true },
    });
});

services.factory('CrearFinal', function ($resource) {
    return $resource('/tracker/rest/curso/crear/', {}, {
    	 crear: { method: 'POST'},
    });
});

services.factory('CursosPorAlumno', function ($resource) {
    return $resource('/tracker/rest/curso/poralumno/:id', {}, {
    	 buscar: { method: 'GET', isArray: true },
    });
});

services.factory('Anotarse', function ($resource) {
    return $resource('/tracker/rest/curso/anotar/:idc/:idu/', {}, {
    	 anotar: { method: 'GET' },
    });
});

