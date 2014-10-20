
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


app.controller('busquedaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'busquedaService','$route','busquedaRemove','busquedaShowUpdateService','$routeParams',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    busquedaService,$route,busquedaRemove,busquedaShowUpdateService,$routeParams) {

            $scope.listaBusquedas=busquedaService.query();
            //$scope.bsq = busquedaShowUpdateService.show({ estado: $scope.estado ,id: $routeParams.busquedaId });
            $scope.guardar = function () {
            
             busquedaShowUpdateService.update({ bsq: $scope.bsq });
             
             $scope.listaBusquedas=busquedaService.query();
             $route.reload();
                                }


            $scope.eliminar=function(idbusqueda){
                
                busquedaRemove.remove({id:idbusqueda})
                $scope.listaBusquedas=busquedaService.query();
            }

        $scope.detalle=function(idbusqueda){ //La idea era usar esto pero por algun motivo me manda al index...
            $location.path('/detalleBusqueda/'+idbusqueda);
        }

        

                 



}]);

app.controller('detalleBusquedaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'detalleBusquedaService','$route','$routeParams','$modal','contactoCreateService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    detalleBusquedaService,$route,$routeParams,$modal,contactoCreateService) {

            $scope.busqueda=detalleBusquedaService.query({id:$routeParams.idBusqueda});

            $scope.openModal = function (size,postulante) {
                $scope.postulanteContactado=postulante;

            var modal = $modal.open({
              templateUrl: '/partials/modalTemplate.html',
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