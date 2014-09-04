'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngdemo', ['ngRoute','ngCookies','ngdemo.filters', 'ngdemo.services', 'ngdemo.directives', 'ui.date', 'ui.mask', 'ngdemo.controllers', 'ui.bootstrap.dropdown', 'ui.bootstrap.modal','ui.bootstrap.transition','ui.bootstrap.datepicker','ui.bootstrap.position','ui.bootstrap.tabs']).
    config(['$routeProvider', '$locationProvider', '$httpProvider',function ($routeProvider,$locationProvider,$httpProvider) {
    	$routeProvider.when('/', {templateUrl: 'partials/index.html', controller: 'IndexController'});

    	$routeProvider.when('/usuario-list', {templateUrl: 'partials/usuario-list.html', controller: 'UsuarioCtrl'});
        $routeProvider.when('/usuario', {templateUrl: 'partials/usuario.html', controller: 'UsuarioCtrl'});
        $routeProvider.when('/usuario/:accion/:id', {templateUrl: 'partials/usuario.html', controller: 'UsuarioCtrl'});

        $routeProvider.when('/ADMIN/crearCuatrimestre', {templateUrl: 'partials/admin/crearCuatrimestre.html', controller: 'CuatrimestreController'});
        $routeProvider.when('/ADMIN/crearCurso', {templateUrl: 'partials/admin/crearCurso.html', controller: 'CursoController'});
        $routeProvider.when('/ADMIN/crearCurso/:id', {templateUrl: 'partials/admin/crearCursoMateria.html', controller: 'CursoController'});
        $routeProvider.when('/ADMIN/cursos', {templateUrl: 'partials/admin/cursos-list.html', controller: 'CursosListController'});
        $routeProvider.when('/ADMIN/cursos/:id', {templateUrl: 'partials/admin/admin/curso.html', controller: 'CursosListController'});
        $routeProvider.when('/ADMIN/inscriptos', {templateUrl: 'partials/admin/inscriptos.html', controller: 'InscriptosController'});
        $routeProvider.when('/ADMIN/inscriptos/materia/:id', {templateUrl: 'partials/admin/inscriptosMateria.html', controller: 'InscriptosMateriaController'});
        $routeProvider.when('/ADMIN/inscriptos/curso/:id', {templateUrl: 'partials/admin/inscriptosCurso.html', controller: 'InscriptosCursoController'});
        $routeProvider.when('/ADMIN/crearAnalitico', {templateUrl: 'partials/admin/crearAnalitico.html', controller: 'AnaliticoController'});
        $routeProvider.when('/ADMIN/crearAnalitico/:id', {templateUrl: 'partials/admin/analitico.html', controller: 'AnaliticoListController'});

        $routeProvider.when('/PROFESOR/crearFinales', {templateUrl: 'partials/profesor/seleccionarCurso.html', controller: 'CrearFinalController'});

        $routeProvider.when('/ALUMNO/anotarse', {templateUrl: 'partials/alumno/listarMateriasPosibles.html', controller: 'AnotarseController'});

        //Carrera
        $routeProvider.when('/carrera-list', {templateUrl: 'partials/carrera-list.html', controller: 'CarreraCtrl'});
        $routeProvider.when('/carrera', {templateUrl: 'partials/carrera.html', controller: 'CarreraCtrl'});
        $routeProvider.when('/carrera/:accion/:id', {templateUrl: 'partials/carrera.html', controller: 'CarreraCtrl'});

        $routeProvider.otherwise({redirectTo: '/login'});
}]).
run(function($rootScope, $cookieStore, $http, $location, $modal) {

	/* Reset error when a new view is loaded */
	$rootScope.$on('$viewContentLoaded', function() {
		delete $rootScope.error;
	});

	$rootScope.seleccione = "Seleccione..";

	/*
	$rootScope.openModalList = function ($scope) {
	    var modalInstance = $modal.open({
	      templateUrl: 'partials/modal-item-list.html',
	      controller: 'ModalListCtrl',
	      scope: $scope,
	      resolve: {
	    	title: function () {
	          return $scope.$title;
	        },
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });
    };
    */
});