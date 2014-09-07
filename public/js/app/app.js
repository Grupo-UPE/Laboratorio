'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngdemo', ['ngRoute','ngCookies','ngdemo.filters', 'ngdemo.services',
    'ngdemo.directives', 'ui.date', 'ui.mask', 'ngdemo.controllers', 'ui.bootstrap.dropdown', 'ui.bootstrap.modal',
    'ui.bootstrap.transition','ui.bootstrap.datepicker','ui.bootstrap.position','ui.bootstrap.tabs']).
    config(['$locationProvider', '$httpProvider','USER_ROLES','$routeProvider',
        function ($locationProvider,$httpProvider,USER_ROLES,$routeProvider) {

            $routeProvider.when('/',
                {
                templateUrl: 'partials/index.html',
                controller: 'IndexController',
            });
            $routeProvider.when('/editar/:textoId', {templateUrl: 'partials/editar.html', controller: 'EditarController'});
            $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginController'});
            $routeProvider.otherwise({redirectTo: '/login'});

}])

    .run(function($rootScope, $cookieStore, $http, $location, $modal, AuthService) {
            // Reset error when a new view is loaded
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