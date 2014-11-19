
'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.postulantes', []);
// Clear browser cache (in development mode)


 app.controller('uploadDoc', ['$scope', '$upload', '$rootScope', '$route', '$cookieStore', '$location', '$http', '$routeParams',
                        'postulanteShowUpdateService',
                                   function ($scope, $upload, $rootScope, $route, $cookieStore, $location, $http, $routeParams,
                                    postulanteShowUpdateService) {

                                       $scope.postulant = postulanteShowUpdateService.show({ id: $routeParams.id });
                                      $scope.volver = function(){
                                        $location.path('/postulantes');
                                      }
                                      $scope.isUploading =0;
                                      $scope.onFileSelect = function($files) {
                                        for (var i = 0; i < $files.length; i++) {
                                          var file = $files[i];
                                          $scope.upload = $upload.upload({
                                            url: '/uploadDoc',
                                            data: {id: $scope.postulant._id},
                                            file: file,
                                            }).progress(function(evt) {
                                              $scope.isUploading =parseInt(100.0 * evt.loaded / evt.total);
                                              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                                              }).success(function(data, status, headers, config) {
                                                console.log(data);
                                             });
                                             }
                                            };

                                       $scope.probar = function(){
                                          console.log($routeParams.id);

                                       }

                                       $scope.guardar = function () {


                                           $location.path('/postulantes');

                                       };
                                   } ]);



app.controller('postulanteCtrlCV', ['$scope', '$rootScope', '$routeParams', '$route', '$http', 'postulanteRemoveService', 'postulanteShowUpdateService', function ($scope, $route, $rootScope, $routeParams, $http, postulanteRemoveService, postulanteShowUpdateService) {

    /* CARGAMOS LOS POSTULANTES EN LA TABLA*/

    $scope.listaPostulantes = [];
    $scope.nombre='';
    $scope.apellido='';
    $scope.curriculumURL='';
    $scope.showModal = false;
    $scope.cerrar = function () {
        $scope.showModal = false;
    }
    $scope.toggleModal = function (postID) {
        $scope.showModal = true;

        $scope.postulant = postulanteShowUpdateService.show({ id: postID });
        $scope.$watch($scope.nombre);
    };

    $scope.cargarPostulantes = function () {
        $http({
            method: 'GET', url: '/REST/postulante'
        }).
      success(function (data) {
          if (typeof (data) == 'object') {
              $scope.listaPostulante = data;
          } else {
              alert('Error al intentar recuperar los Postulantes.');
          }
      }).
      error(function () {
          alert('Error al intentar recuperar los Postulantes.');
      });
    };


    $scope.cargarPostulantes();

    /* FUNCION PARA LA CARGA DES ARCHIVOS*/
    $scope.disabled = false;
    $scope.bar = function (content) {
        if (console) console.log(content);
        $scope.uploadResponse = content.msg;
        $route.reload();
    }

    /* FUNCION PARA ELIMINAR UN POSTULANTE */
    $scope.eliminar = function (idpostulante) {
        postulanteRemoveService.remove({ id: idpostulante })
        $scope.cargarPostulantes();
    }

    /* FUNCION PARA LOS TAGS */

    $scope.loadTags = function (query) { //Podriamos usar un service tambien. Pero como es bastante sencillo no se si nos conviene.
        return $http.get('/REST/tags/' + query);
    }


} ]);

//controllers Postulantes

app.controller('postulanteListCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'postulanteService', 'postulanteShowUpdateService', 'postulanteCreateService', 'postulanteRemoveService', '$route',
                        'totalPostulantes',
                                   function ($scope, $rootScope, $cookieStore, $location, $http,
                                    postulanteService, postulanteShowUpdateService, postulanteCreateService, postulanteRemoveService, $route,
                                    totalPostulantes) {

                                    $scope.paginaActual=1;
                                    $scope.totalPaginas=1;
                                    $scope.listaPostulantes = postulanteService.query();

                                    $scope.totalPostulantes=totalPostulantes.get({},function(){
                                        $scope.totalPaginas=(Math.floor($scope.totalPostulantes.total/5)+1);
                                    });

                                    $scope.pagina = function (pagina){
                                        $scope.paginaActual=pagina;
                                        $scope.listaPostulantes = postulanteService.query({pagina:pagina});
                                    }


                                       $scope.showModal_cv = false;
                                       $scope.showModal = false;

                                        $scope.reload = function () {
                                            $isUploading
                                            $scope.showModal_cv = false;
                                            $scope.estaSubiendo= false;
                                            $scope.showModal = false;
                                            $scope.showModal2 = false;
                                            console.log("Paso por aca");
                                            if($scope.postulant){
                                                console.log("Y por aca tambien");
                                                $route.reload();
                                            }
                                        };




                                       $scope.eliminar = function (idpostulante) {
                                           postulanteRemoveService.remove({ id: idpostulante })
                                           $scope.listaPostulantes = postulanteService.query();
                                       }

                                      $scope.cargarCurriculum = function(postID){
                                        $scope.showModal = false;
                                        $location.path('/subirCV/'+ postID);
                                      }
                                       $scope.guardar = function(){
                                          var postulante=postulanteCreateService.create({ postulante: $scope.postulante }, function(){
                                              $location.path('/subirCV/'+postulante._id);

                                          });
                                       }

                                       $scope.loadTags = function (query) { //Podriamos usar un service tambien. Pero como es bastante sencillo no se si nos conviene.
                                           return $http.get('/REST/tags/' + query);
                                       }

                                      /*
                                      var data = $scope.listaPostulantes = postulanteService.query();
                                      $scope.tableParams = new ngTableParams({
                                          page: 1,            // show first page
                                          count: 10           // count per page
                                        }, {
                                          total: data.length, // length of data
                                            getData: function($defer, params) {
                                            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                            }
                                         });

                                      */


                                       $scope.isUploadingCV = function(){
                                          $scope.showModal_cv = false;
                                          $scope.estaSubiendo= true;
                                       }

                                      $scope.modalCV = function(postID){
                                        $scope.showModal_cv = true;
                                        $scope.postulant = postulanteShowUpdateService.show({ id: postulante._id });
                                      }


                                      $scope.cerrar = function () {
                                      $scope.showModal = false;
                                      $scope.showModal2 = false;
                                }
                                $scope.toggleModal = function (postID) {
                                    $scope.showModal = true;
                                    $scope.postulant = postulanteShowUpdateService.show({ id: postID });

                                };



                                   } ]);

 app.controller('postulanteReload', ['$location','$route','$timeout', function ($location,$route,$timeout) {

    $route.reload();

    $timeout(function() {
        $location.path('/postulantes') //Feo pero creo que funciona.
    }, 1000);


}]);

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
