
'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.busquedas', []);
// Clear browser cache (in development mode)
app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});


app.controller('busquedaCreateCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'busquedaService','busquedaCreateService','habilidadService','$route',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    busquedaService,busquedaCreateService,habilidadService,$route ) {

            $scope.listabusquedas=busquedaService.query();
            $scope.listahabilidades=habilidadService.query();

            $scope.loadTags=function(query){
              return $http.get('/REST/tags/'+query);
            }
            /*$scope.loadEntrevistadores=function(tag){
              return $http.get('/REST/entrevistadores/'+tag);
            }*/



            $scope.guardar = function () {
                 busquedaCreateService.create({busqueda:$scope.busqueda});
              //$scope.listabusquedas=busquedaService.query();
              $route.reload();
              $scope.listabusquedas=busquedaService.query();
        };

}]);


app.controller('busquedaListCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'busquedaService','$route',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    busquedaService,$route ) {


            $scope.listaBusquedas=busquedaService.query();




}]);
app.controller('busquedaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'busquedaService','$route','busquedaRemove','busquedaShowUpdateService','$routeParams','posiblesPostulantes',
                        '$modal','busquedaServiceState',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    busquedaService,$route,busquedaRemove,busquedaShowUpdateService,$routeParams,posiblesPostulantes,
                                    $modal,busquedaServiceState) {

            $scope.listaBusquedasState=busquedaServiceState.query({estado: $routeParams.estado});


            //$scope.bsq = busquedaShowUpdateService.show({ estado: $scope.estado ,id: $routeParams.busquedaId });
            $scope.guardar = function () {


             busquedaShowUpdateService.update({ bsq: $scope.bsq,id:$routeParams._id });
             $route.reload();
                                }


            $scope.eliminar=function(idbusqueda){

                busquedaRemove.remove({id:idbusqueda})
                $scope.listaBusquedas=busquedaService.query();
            }

            $scope.buscarPostulantes=function(habilidades){
                posiblesPostulantes.query({habilidades:habilidades});
            }

        $scope.detalle=function(idbusqueda){ //La idea era usar esto pero por algun motivo me manda al index...
            $location.path('/detalleBusqueda/'+idbusqueda);
        }

        //Modal para ver los posibles postulantes.
        $scope.openModal = function (size,busqueda) {
                $scope.busqueda=busqueda;

            var modal = $modal.open({
              templateUrl: '/partials/modalPosibles.html',
              controller: 'modalPosiblesCTRL',
              size: size,
              resolve: {
                busqueda:function(){
                    return busqueda;
                }
              }
            });

            modal.result.then(function (selectedItem) {
              console.log('modal cerrado');
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
            });
          };






}]);

app.controller('detalleBusquedaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'detalleBusquedaService','$route','$routeParams','$modal','contactoCreateService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    detalleBusquedaService,$route,$routeParams,$modal,contactoCreateService) {

            $scope.busqueda=detalleBusquedaService.query({id:$routeParams.idBusqueda});

            $scope.openModal = function (size,postulante) {
                $scope.postulanteContactado=postulante;

            var modal = $modal.open({
              templateUrl: '/partials/modalContacto.html',
              controller: 'modalCTRL',
              size: size,
              resolve: {
                postulante:function(){
                    return postulante;
                }
              }
            });

            modal.result.then(function (selectedItem) {
              console.log('modal cerrado');
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
            });
          };

            $scope.generarentrevista=function(idbusqueda,idpostulante){

            $location.path('/generarentrevista/'+idbusqueda+'/'+idpostulante);
        }

            $scope.list = function () {

              $scope.listaBusquedas=busquedaService.query();
        };
        $scope.guardarContacto = function(postulante, comentario){
            contactoCreateService.create({postulante:postulante, comentario:comentario})
      }

}]);

//Modal de contacto
app.controller('modalCTRL',
    function ($scope, $modalInstance, postulante, contactoPostulanteListService) {

      $scope.postulante = postulante;
      $scope.contactos = contactoPostulanteListService.query({postulante:postulante._id})

 $scope.ok = function () {
    $modalInstance.close('cerrado');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

//Modal de posibles contactos
app.controller('modalPosiblesCTRL',
    function ($scope, $modalInstance, busqueda, posiblesPostulantes, asociarPostulante) {

      $scope.busqueda = busqueda;
      console.log(busqueda.habilidades);
      $scope.postulantes=posiblesPostulantes.query({habilidades:busqueda.habilidades});
      $scope.selection=[];

      $scope.toggleSelection = function toggleSelection(postulante) {
      var idx = $scope.selection.indexOf(postulante);

      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.selection.push(postulante);
      }
    };

      $scope.guardar = function (selection) {
          asociarPostulante.asociar({id: busqueda._id, postulantes : $scope.selection});
  };

 $scope.ok = function () {
    $modalInstance.close('cerrado');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
