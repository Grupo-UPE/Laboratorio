
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
