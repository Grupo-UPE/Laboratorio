
'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.usuarios', []);
// Clear browser cache (in development mode)


app.controller('usuarioListCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'usuarioService','usuarioCreateService','rolService','$route',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    usuarioService,usuarioCreateService,rolService,$route) {

            $scope.listaUsuarios=usuarioService.query();
            //Lo que sigue tiene que venir de un query... un services que devuelva todos los roles.
            //Se lo deja para utiizar a modo de ejemplo para armar el html.
            //$scope.listaRoles=[{id:"5418858979b8c2751f48803f",nombre:"Rol 1"},{id:"5418858979b8c2751f48803g",nombre:"Rol 3"},{id:"5418858979b8c2751f48803t",nombre:"Otro rol de prueba"}];
            $scope.listaRoles=rolService.query();
            $scope.guardar = function () {
                var algo=usuarioCreateService.create({usuario:$scope.usr});
                  $scope.listaUsuarios=usuarioService.query();
                    $route.reload(); //Probe varias cosas y es lo unico que me funciona sin usar promises o algo de eso.

            }
            }]);

app.controller('usuarioCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','$routeParams',
                        'usuarioShowUpdateService','rolService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,$routeParams,
                                    usuarioShowUpdateService,rolService) {
            $scope.usr=usuarioShowUpdateService.show({id: $routeParams.usuarioId});
            $scope.listaRoles=rolService.query();
            $scope.guardar = function () {
                usuarioShowUpdateService.update({usuario: $scope.usr});
               //$location.path('/usuarios');
            };
            $scope.volver = function(){
                $location.path('/usuarios');
            }
}]);

//busqueda de usuarios
app.controller('buserCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'buserService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    buserService) {
            $scope.listaUser=buserService.query();

            $scope.buscarusuario = function () {
                    $scope.listaUser=buserService.query();
                    $route.reload();
                }
            }
            ]);