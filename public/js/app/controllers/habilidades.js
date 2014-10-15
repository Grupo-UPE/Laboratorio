'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.habilidades', []);
// Clear browser cache (in development mode)

app.controller('habilidadCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'habilidadService',"$route",'habilidadCreateService','habilidadRemove',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    habilidadService,$route,habilidadCreateService,habilidadRemove) {

            $scope.listaHabilidades=habilidadService.query();

           /* $scope.guardar = function () {
               var algo= habilidadCreateService.create({habilidad: $scope.habilidad});
              $route.reload();
            };*/
            $scope.eliminar=function(idHabilidad){
                console.log(idHabilidad);
                habilidadRemove.remove({id:idHabilidad})
                $scope.listaHabilidades=habilidadService.query();
            }

            	$scope.guardar=function(){
                        habilidadCreateService.create({habilidad:$scope.habilidad});
            	$scope.listaHabilidades=habilidadService.query();
            	$route.reload();
                }


}]);