'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.entrevistas', []);
// Clear browser cache (in development mode)



app.controller('generarEntrevistaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'detalleBusquedaService','$route','$routeParams','postulanteShowUpdateService','entrevistaCreateService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    detalleBusquedaService,$route,$routeParams,postulanteShowUpdateService,entrevistaCreateService) {

            $scope.busqueda=detalleBusquedaService.query({id:$routeParams.idBusqueda});
            $scope.postulante=postulanteShowUpdateService.show({id:$routeParams.idPostulante});
            $scope.generarEntrevista=function(){
                entrevistaCreateService.create({entrevista:$scope.entrevista,busqueda:$scope.busqueda,postulante:$scope.postulante});}

}]);