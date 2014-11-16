
'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers', []);


// Clear browser cache (in development mode)
app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});


app.controller('IndexController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
    'textoservice','textoserviceid','textoremove','textocreate','controlAcceso','google',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    textoservice,textoserviceid,textoremove,textocreate,controlAcceso,google) {
                                    //Prueba de googleapis
                                    $scope.profile=google.query();

            $scope.listatextos=textoservice.query();
            $scope.guardar = function () {
                textocreate.create({texto: $scope.txt});
                $scope.listatextos=textoservice.query();
                $scope.txt="";
        };

            $scope.eliminar=function(idtexto){
                textoremove.remove({id:idtexto})
                $scope.listatextos=textoservice.query();
            }
}]);

app.controller('EditarController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','$routeParams',
    'textoserviceid','controlAcceso',
                                   function($scope, $rootScope, $cookieStore, $location, $http,$routeParams,
                                    textoserviceid,controlAcceso) {

            $scope.txt=textoserviceid.show({id: $routeParams.textoId});
            $scope.guardar = function () {
                textoserviceid.update({texto: $scope.txt.texto,id:$routeParams.textoId});
            };
            $scope.volver = function(){
                $location.path('/');
            }
}]);

//Control principal del logueo.
app.controller('ApplicationController', function ($scope,
                                               Session,estaLogueado) {
    $scope.usuario=estaLogueado.query();

})

//controller del modal
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

app.controller('generarEntrevistaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'detalleBusquedaService','$route','$routeParams','postulanteShowUpdateService','entrevistaCreateService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    detalleBusquedaService,$route,$routeParams,postulanteShowUpdateService,entrevistaCreateService) {

            $scope.busqueda=detalleBusquedaService.query({id:$routeParams.idBusqueda});
            $scope.postulante=postulanteShowUpdateService.show({id:$routeParams.idPostulante});
            $scope.generarEntrevista=function(){
                entrevistaCreateService.create({entrevista:$scope.entrevista,busqueda:$scope.busqueda,postulante:$scope.postulante});}

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

app.controller('mailCTRL',['$scope','$rootScope','$http',
                   function($scope,$rootScope, $http) {

    $scope.mail = {};

	// Función para registrar a una persona
	$scope.enviar = function() {
		$http.post('/send', $scope.mail)
		.success(function(data) {
				$scope.mail = {}; // Borramos los datos del formulario
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};



}]);

app.controller('bpostuCTRL', ['$scope', '$rootScope', '$http','$route',
                              function ($scope, $rootScope,  $http, $route) {
    $scope.bpostulante = {};
    $scope.bpostulist = {};
    
        $scope.buscar = function () {
        $http.post('/REST/bpostu', $scope.bpostulante)
        .success(function(data) {
            $scope.bpostulante = {}; // Borramos los datos del formulario
            $scope.bpostulist = data;
            console.log('Data'+data);
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
           
        }
      }]);