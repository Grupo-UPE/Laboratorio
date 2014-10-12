'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers', []);


// Clear browser cache (in development mode)
app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

//postulantes controllers

app.controller('postulanteCtrlCV', function ($scope) {
            $scope.disabled = false;
            $scope.bar = function(content) {
              if (console) console.log(content);
                $scope.uploadResponse = content.msg;
            }
        });

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
                    $route.reload(); //Probe varias cosas y es lo unico que me funciona sin usar promises o algo de eso.

            }
            }]);

app.controller('usuarioCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','$routeParams',
                        'usuarioShowUpdateService','rolService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,$routeParams,
                                    usuarioShowUpdateService,rolService) {
            $scope.usuario=usuarioShowUpdateService.show({id: $routeParams.usuarioId});
            $scope.listaRoles=rolService.query();
            $scope.guardar = function () {
                usuarioShowUpdateService.update({usuario: $scope.usuario});
               //$location.path('/usuarios');
            };
            $scope.volver = function(){
                $location.path('/usuarios');
            }
}]);

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

//Control principal del logueo.
app.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AuthService,Session,estaLogueado) {
    //var a=
    $scope.currentUser=estaLogueado.query();
  //$scope.currentUser = null;
  //$scope.userRoles = USER_ROLES;

  //$scope.setCurrentUser = function (user) { //Esto es llamado desde desde $scope.login del LoginController.
  //  $scope.currentUser = user;
  //};


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

app.controller('busquedaCreateCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'busquedaService','busquedaCreateService','habilidadService','$route',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    busquedaService,busquedaCreateService,habilidadService,$route ) {

            $scope.listabusquedas=busquedaService.query();
            $scope.listahabilidades=habilidadService.query();

            $scope.loadTags=function(query){
              return $http.get('/REST/tags/'+query);
            }

            $scope.guardar = function () {
                 busquedaCreateService.create({busqueda:$scope.busqueda});
              $scope.listabusquedas=busquedaService.query();
              $route.reload();
        };

}]);


app.controller('busquedaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'busquedaService','$route',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    busquedaService,$route) {

            $scope.listaBusquedas=busquedaService.query();

             $scope.list = function () {

              $scope.listaBusquedas=busquedaService.query();
              };
        $scope.detalle=function(idbusqueda){ //La idea era usar esto pero por algun motivo me manda al index...
            $location.path('/detalleBusqueda/'+idbusqueda);
        }


}]);

app.controller('detalleBusquedaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'detalleBusquedaService','$route','$routeParams',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    detalleBusquedaService,$route,$routeParams) {

            $scope.busqueda=detalleBusquedaService.query({id:$routeParams.idBusqueda});

            $scope.generarentrevista=function(idbusqueda,idpostulante){

            $location.path('/generarentrevista/'+idbusqueda+'/'+idpostulante);
        }

            $scope.list = function () {

              $scope.listaBusquedas=busquedaService.query();
        };

}]);

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