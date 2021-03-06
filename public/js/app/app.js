'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngdemo', ['ngRoute', 'ngUpload', 'angularFileUpload','ngCookies','ngdemo.filters', 'ngdemo.services',
    'ngdemo.directives', 'ui.date', 'ui.mask', 'ngdemo.controllers','ngdemo.controllers.busquedas','ngdemo.controllers.postulantes',
    'ngdemo.controllers.usuarios','ngdemo.controllers.habilidades','ngdemo.controllers.entrevistas',
    'ui.bootstrap.dropdown', 'ui.bootstrap.modal','ngdemo.controllers.login',
    'ui.bootstrap.transition','ui.bootstrap.datepicker','ui.bootstrap.position','ui.bootstrap.tabs','ngTagsInput','ui.bootstrap','ui.bootstrap.tpls',]).
    config(['$locationProvider', '$httpProvider','$routeProvider',
        function ($locationProvider,$httpProvider,$routeProvider) {
            //Rutas del index y de pruebas
            $routeProvider.when('/',
                {
                templateUrl: 'partials/index.html',
                controller: 'IndexController',
            });
            $routeProvider.when('/editar/:textoId',
                {
                    templateUrl: 'partials/editar.html',
                    permisos : ['admin']
                });

            //Rutas para manejar usuarios

            $routeProvider.when('/usuarios',
                {
                    templateUrl: 'partials/usuario-list.html',
                    controller: 'usuarioListCTRL',
                    permisos : ['admin'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });
            $routeProvider.when('/usuarios/:usuarioId',
                {
                    templateUrl: 'partials/usuario-edit.html',
                    controller: 'usuarioCTRL',
                    permisos : ['admin'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

            //rutas para crear perfiles de usuarios

            /*$routeProvider.when('/roles',
                {
                    templateUrl: 'partials/create-rol.html',
                    controller: 'usuarioCTRL',
                    permisos : ['admin'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });
*/

            //rutas para el manejo de postulantes

            $routeProvider.when('/postulanteCV',
                {
                templateUrl: 'partials/postulanteCV.html',
                controller: 'postulanteCtrlCV',
            });


            $routeProvider.when('/postulantes',
                {
                    templateUrl: 'partials/postulante-list.html',
                    controller: 'postulanteListCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

            $routeProvider.when('/postulantes/reload',
                {
                    templateUrl: 'partials/postulante-list.html',
                    controller: 'postulanteReload',
                });

            $routeProvider.when('/postulantes/:postulanteId',
                {
                    templateUrl: 'partials/postulante-edit.html',
                    controller: 'postulanteCTRL',
                    permisos : ['admin'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

            $routeProvider.when('/subirCV/:id',
                {
                    templateUrl: 'partials/subirCV.html',
                    controller: 'uploadDoc',
                });


	    $routeProvider.when('/createbusquedas',
                {
                    templateUrl: 'partials/create-busqueda.html',
                    controller: 'busquedaCreateCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });
        $routeProvider.when('/busquedalist/all',
                {
                    templateUrl: 'partials/busqueda-list.html',
                    controller: 'busquedaListCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });
        $routeProvider.when('/busqueda/:busquedaId',
                {
                    templateUrl: 'partials/busqueda-edit.html',
                    controller: 'busquedaListCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });
        $routeProvider.when('/busquedastate/:busquedaId',
                {
                    templateUrl: 'partials/busquedastate-edit.html',
                    controller: 'busquedastateListCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });
        $routeProvider.when('/busquedalist/:estado',
                {
                    templateUrl: 'partials/busqueda-list-state.html',
                    controller: 'busquedaCTRL',
                    permisos : ['admin'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

	//busqueda de usuarios
	$routeProvider.when('/buser',
                {
                    templateUrl: 'partials/buser-list.html',
                    controller: 'buserCTRL',
                    permisos : ['RRHH'] //Lo dejo no se el fin que le den.
                });

    //importacion csv
    $routeProvider.when('/import',
                {
                    permisos : ['RRHH'] //Lo dejo no se el fin que le den.
                });

    //busqueda postu
     $routeProvider.when('/bpostu',
                {
                    templateUrl: 'partials/bpostu.html',
                    controller: 'bpostuCTRL',
                    permisos : ['RRHH'] //Lo dejo no se el fin que le den.
                });

    //send mail
    $routeProvider.when('/send',
                {
                    templateUrl: 'partials/FormMail.html',
                    controller: 'mailCTRL',
                    permisos : ['RRHH'] //Lo dejo no se el fin que le den.
                });

	//Rutas para manejar Habilidades
	$routeProvider.when('/habilidad',
                {
                    templateUrl: 'partials/habilidad-list.html',
                    controller: 'habilidadCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

             $routeProvider.when('/busquedabis/:estado',
                {
                    templateUrl: 'partials/busquedaBis-list.html',
                    controller: 'busquedaCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

             $routeProvider.when('/busquedabis',
                {
                    templateUrl: 'partials/busquedaBis-list.html',
                    controller: 'busquedaBisCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

              $routeProvider.when('/detalleBusqueda/:idBusqueda',
                {
                    templateUrl: 'partials/detalleBusqueda.html',
                    controller: 'detalleBusquedaCTRL',
                    permisos : ['RRHH'] //En realidad no lo estamos usando, pero por las dudas lo dejo.
                });

            $routeProvider.when('/generarentrevista/:idBusqueda/:idPostulante',
                {
                templateUrl: 'partials/entrevista.html',
                controller: 'generarEntrevistaCTRL',
            });

            $routeProvider.otherwise({redirectTo: '/'});

}])

.config(function(tagsInputConfigProvider){
    tagsInputConfigProvider
        .setDefaults('tagsInput',{
            //placeholder:'Ingrese las Habilidades del Postulante',
            displayProperty:'nombre',
            addFromAutocompleteOnly:true,
            addOnEnter: true,

        })
        .setDefaults('autoComplete',{
            maxResultsToShow: 20,
            debounceDelay: 100,
            minLength: 1,
            highlightMatchedText: true,
            loadOnDownArrow: true,

        })

})

    .run(function($rootScope, $cookieStore, $http, $location, $modal, AuthService,controlAcceso) {
            // Reset error when a new view is loaded
	$rootScope.$on('$viewContentLoaded', function() {
		delete $rootScope.error;
	});})


    /*.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q) {
        return {
            'response': function (response) {
                //Si es menor de 200 es un response
                //console.log(response);
                return response;
            },
            'responseError': function (rejection) {
                //300 o mas es un error.
                if(rejection.status === 401) {
                    //401 es e no autorizado.
                    window.location = "/login";
                }
                return $q.reject(rejection);
            }
        };
    });
}]); */
