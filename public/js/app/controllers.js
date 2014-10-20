
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
    'textoservice','textoserviceid','textoremove','textocreate','USER_ROLES','controlAcceso','google',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    textoservice,textoserviceid,textoremove,textocreate,USER_ROLES,controlAcceso,google) {
                                    //Prueba de googleapis
                                    $scope.profile=google.query();
            /*var roles=[USER_ROLES.admin,USER_ROLES.rhh]
              if($scope.currentUser===null){
                $location.path('/login');
            }else{
                if(!controlAcceso.puedeAcceder($scope.currentUser,roles)){
                    $location.path('/');
                }
            }
    */
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
    'textoserviceid','USER_ROLES','controlAcceso',
                                   function($scope, $rootScope, $cookieStore, $location, $http,$routeParams,
                                    textoserviceid,USER_ROLES,controlAcceso) {
           /* var roles=[USER_ROLES.admin];
            $scope.roles=[USER_ROLES.admin];
           if($scope.currentUser===null){
                $location.path('/login');
            }else{
                if(!controlAcceso.puedeAcceder($scope.currentUser,roles)){
                    $location.path('/');
                }
            }
            */

            $scope.txt=textoserviceid.show({id: $routeParams.textoId});
            $scope.guardar = function () {
                textoserviceid.update({texto: $scope.txt.texto,id:$routeParams.textoId});
            };
            $scope.volver = function(){
                $location.path('/');
            }
}]);

app.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  rrhh: 'rrhh',
  entrevistador: 'entrevistador',
  invitado:'invitado'
});

//Control principal del logueo.
app.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AuthService,Session,estaLogueado) {
    $scope.currentUser=estaLogueado.query();
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
<<<<<<< HEAD

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

$scope.enviar = function() {
    console.log('Im in the controller');

    // Trigger validation flag.
    $scope.submitted = true;

    $http.post('/send', {
        to: $scope.to,
        subject: $scope.subject,
        content: $scope.content
    }).success(function(data, status, headers, config) {
            if(data.success){
                $location.path('/send');
            }else {
                //do something about the error
            }
        });
    
    console.log($scope.to);
    console.log($scope);
};

}]);
=======
>>>>>>> dd6b964d822a37ce9652eb2e737025683ecc8bd5
