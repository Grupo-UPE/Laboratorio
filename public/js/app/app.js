'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngdemo', ['ngRoute','ngCookies','ngdemo.filters', 'ngdemo.services',
    'ngdemo.directives', 'ui.date', 'ui.mask', 'ngdemo.controllers', 'ui.bootstrap.dropdown', 'ui.bootstrap.modal',
    'ui.bootstrap.transition','ui.bootstrap.datepicker','ui.bootstrap.position','ui.bootstrap.tabs']).
    config(['$locationProvider', '$httpProvider','USER_ROLES','$routeProvider',
        function ($locationProvider,$httpProvider,USER_ROLES,$routeProvider) {
            //Rutas del index y de pruebas
            $routeProvider.when('/',
                {
                templateUrl: 'partials/index.html',
                controller: 'IndexController',
            });
            $routeProvider.when('/editar/:textoId',
                {
                    templateUrl: 'partials/editar.html',
                    controller: 'EditarController',
                    permisos : ['admin']
                });
            $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginController'});
            $routeProvider.otherwise({redirectTo: '/login'});

            //Rutas para manejar usuarios

            $routeProvider.when('/usuarios',
                {
                    templateUrl: 'partials/usuario-list.html',
                    controller: 'usuarioListCTRL',
                    permisos : ['admin'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });
            $routeProvider.when('/usuarios/:usuarioId',
                {
                    templateUrl: 'partials/usuario.html',
                    controller: 'usuarioCTRL',
                    permisos : ['admin'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

}])

    .run(function($rootScope, $cookieStore, $http, $location, $modal, AuthService,controlAcceso) {
            // Reset error when a new view is loaded
	$rootScope.$on('$viewContentLoaded', function() {
		delete $rootScope.error;
	});});