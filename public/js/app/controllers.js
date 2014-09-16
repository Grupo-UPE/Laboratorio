'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers', []);


// Clear browser cache (in development mode)
app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

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
                var algo=usuarioCreateService.create({usuario:$scope.usuario});
                    $route.reload();

            }
            }]);

app.controller('usuarioCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','$routeParams',
                        'usuarioShowUpdateService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,$routeParams,
                                    usuarioShowUpdateService) {
            $scope.usuario=usuarioShowUpdateService.show({id: $routeParams.textoId});
            $scope.guardar = function () {
                usuarioShowUpdateService.update({usuario: $scope.usuario});
               $location.path('/usuarios');
            };
            $scope.volver = function(){
                $location.path('/usuarios');
            }
}]);

app.controller('IndexController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
    'textoservice','textoserviceid','textoremove','textocreate','USER_ROLES','controlAcceso',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    textoservice,textoserviceid,textoremove,textocreate,USER_ROLES,controlAcceso) {
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

/*Sacamos algo de aca
https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec
*/
app.controller('LoginController', function ($scope, $rootScope, AuthService,$location) {
  $scope.credenciales = {
    username: '',
    password: ''
  };
  $scope.login = function (credenciales) {
    AuthService.login(credenciales).then(function (user) {
      $scope.setCurrentUser(user);
      $location.path('/');
    }, function () {
    });
  };
})

app.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  rrhh: 'rrhh',
  entrevistador: 'entrevistador',
  invitado:'invitado'
});

app.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AuthService,Session) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;

  $scope.setCurrentUser = function (user) { //Esto es llamado desde desde $scope.login del LoginController.
    $scope.currentUser = user;
  };


/*  $scope.$on('$viewContentLoaded', function($scope) {
    //var permisos = $route.permisos;
    var permitidos = $route.current.$$route.permisos;
    console.log($scope)
    if($scope.currentUser===undefined){
                $location.path('/login');
        }else{
            console.log("a");
                if(!controlAcceso.puedeAcceder($scope.currentUser,permitidos)){
                    $location.path('/');
                }
            }
  });


})*/
})