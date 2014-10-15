
'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.postulantes', []);
// Clear browser cache (in development mode)


app.controller('postulanteCtrlCV',['$scope', function ($scope) {
            $scope.disabled = false;
            $scope.bar = function(content) {
              if (console) console.log(content);
                $scope.uploadResponse = content.msg;
            }
        }]);

//controllers Postulantes

app.controller('postulanteListCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'postulanteService', 'postulanteCreateService', 'postulanteRemoveService', '$route',
                                   function ($scope, $rootScope, $cookieStore, $location, $http,
                                    postulanteService, postulanteCreateService, postulanteRemoveService, $route) {

                                       $scope.eliminar = function (idpostulante) {
                                           postulanteRemoveService.remove({ id: idpostulante })
                                           $scope.listaPostulantes = postulanteService.query();
                                       }

                                       $scope.listaPostulantes = postulanteService.query();
                                       $scope.guardar = function () {
                                           var postulante = postulanteCreateService.create({ postulante: $scope.postulante });
                                           $route.reload();

                                       }

                                       $scope.loadTags=function(query){ //Podriamos usar un service tambien. Pero como es bastante sencillo no se si nos conviene.
                                            return $http.get('/REST/tags/'+query);
                                        }


                                   } ]);

 app.controller('postulanteCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http', '$routeParams',
                        'postulanteShowUpdateService',
                                   function ($scope, $rootScope, $cookieStore, $location, $http, $routeParams,
                                    postulanteShowUpdateService) {
                                       $scope.postulante = postulanteShowUpdateService.show({ id: $routeParams.postulanteId });

                                       $scope.guardar = function () {

                                           postulanteShowUpdateService.update({ postulante: $scope.postulante });
                                           $location.path('/postulantes');
                                       };

                                       $scope.volver = function () {
                                           $location.path('/postulantes');
                                       }
                                   } ]);
