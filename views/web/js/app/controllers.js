'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers', []);


// Clear browser cache (in development mode)
app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

/* USUARIO */
app.controller('UsuarioCtrl', ['$scope', '$location', '$routeParams', 'UsuarioFactory', 'UsuarioListFactory',
    function ($scope, $location, $routeParams, UsuarioFactory, UsuarioListFactory) {
	    // callback for ng-click 'createUsuario':
	    $scope.create = function () {
	    	$location.path('/usuario/');
	    };

	     // callback for ng-click 'editUsuario':
        $scope.edit = function (usuarioId) {
        	$location.path('/usuario/EDIT/' + usuarioId);
        };

        // callback for ng-click 'showUsuario':
        $scope.show = function (usuarioId) {
        	$location.path('/usuario/SHOW/' + usuarioId);
        };

        // callback for ng-click 'delete':
        $scope.delete = function (usuarioId) {
        	if (confirm(getConfirmDeleteMsg("Usuario", usuarioId))) {
        		UsuarioFactory.remove({ id: usuarioId },
    				// success
    				function (data) {
    					$route.reload();
    					$scope.message = getSuccessDeleteMsg("Usuario", usuarioId);
    	    		},
    				// error
    				function (error) {
    					$scope.error = getErrorDeleteMsg("Usuario", usuarioId, error);
    				});
	    	};
	    };

	    // callback for ng-click 'save':
        $scope.save = function () {
        	$scope.message = '';
        	UsuarioFactory.create($scope.usuario,
        	        //success
        	        function( value,$rootScope ){
        				$scope.message = getSuccessSaveMsg("Usuario", $scope.usuario.username,  $scope.usuario.password);
        				$scope.usuario=null;
        				},
        	        //error
        	        function( error ){
        					$scope.error = getErrorSaveMsg("Usuario", $scope.usuario.username, error);
        			});
        };

        // callback for ng-click 'update':
        $scope.update = function () {
        	UsuarioFactory.update($scope.usuario,
	    			// success
	    			function (data) {
        		        $scope.message = getSuccessUpdateMsg("Usuario", $scope.usuario.id, $scope.usuario.username);
	    			},
	    			// error
	    			function (error) {
	    				$scope.error = getErrorUpdateMsg("Usuario", $scope.usuario.username, error);
	    			});
	    };


	    // callback for ng-click 'cancel':
	    $scope.cancel = function () {
	    	$location.path('/usuario-list');
	    };

	    $scope.accion = 'NEW';
        //usuario que se va a editar
        if ($routeParams.id != null) {
	    	$scope.accion = $routeParams.accion;
	    	$scope.usuario = UsuarioFactory.show({id: $routeParams.id});
	    } else {
	    	$scope.usuarios = UsuarioListFactory.query();
	    };


}]);

/* Carrera */
app.controller('CarreraCtrl', ['$scope', '$location', '$routeParams', 'CarreraFactory', 'CarreraListFactory','PlanListFactory',
    function ($scope, $location, $routeParams, CarreraFactory, CarreraListFactory, PlanListFactory) {
	    // callback for ng-click 'createcarrera':
	    $scope.create = function () {
	    	$location.path('/carrera/');
	    };

	     // callback for ng-click 'editUsuario':
        $scope.edit = function (carreraId) {
        	$location.path('/carrera/EDIT/' + carreraId);
        };

        // callback for ng-click 'showUsuario':
        $scope.show = function (carreraId) {
        	$location.path('/carrera/SHOW/' + carreraId);
        };

        // callback for ng-click 'delete':
        $scope.delete = function (carreraId) {
        	if (confirm(getConfirmDeleteMsg("Carrera", carreraId))) {
        		CarreraFactory.remove({ id: carreraId },
    				// success
    				function (data) {
    					$route.reload();
    					$scope.message = getSuccessDeleteMsg("Carrera", carreraId);
    	    		},
    				// error
    				function (error) {
    					$scope.error = getErrorDeleteMsg("Carrera", carreraId, error);
    				});
	    	};
	    };

	    // callback for ng-click 'save':
        $scope.save = function () {
        	$scope.message = '';
        	CarreraFactory.create($scope.carrera,
        	        //success
        	        function( value,$rootScope ){
        				$scope.message = getSuccessSaveMsg("Carrera", $scope.carrera.nombre);
        				$scope.carrera=null;
        				},
        	        //error
        	        function( error ){
        					$scope.error = getErrorSaveMsg("Carrera", $scope.carrera.nombre, error);
        			});
        };

        // callback for ng-click 'update':
        $scope.update = function () {
        	CarreraFactory.update($scope.carrera,
	    			// success
	    			function (data) {
        		        $scope.message = getSuccessUpdateMsg("Carrera", $scope.carrera.id, $scope.carrera.nombre);
	    			},
	    			// error
	    			function (error) {
	    				$scope.error = getErrorUpdateMsg("Carrera", $scope.carrera.nombre, error);
	    			});
	    };


	    // callback for ng-click 'cancel':
	    $scope.cancel = function () {
	    	$location.path('/carrera-list');
	    };

	    $scope.accion = 'NEW';
        //usuario que se va a editar
        if ($routeParams.id != null) {
	    	$scope.accion = $routeParams.accion;
	    	$scope.carrera = CarreraFactory.show({id: $routeParams.id});
	    } else {
	    	$scope.carreras = CarreraListFactory.query();
	    };

	    $scope.planes = PlanListFactory.query();



}]);

app.controller('IndexController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','listatextos',
                                   function($scope, $rootScope, $cookieStore, $location, $http,listatextos) {
	$scope.listatextos=listatextos.query();
}]);

app.controller('CuatrimestreController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','Quien',
                                   function($scope, $rootScope, $cookieStore, $location, $http,Quien) {
	$scope.usuario=Quien.query();
}]);

app.controller('CursoController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','Quien',
                                          function($scope, $rootScope, $cookieStore, $location, $http,Quien) {
       	$scope.usuario=Quien.query();
       }]);
app.controller('CursosListController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','Quien',
                                          function($scope, $rootScope, $cookieStore, $location, $http,Quien) {
       	$scope.usuario=Quien.query();
       }]);
app.controller('InscriptosController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','Quien',
                                          function($scope, $rootScope, $cookieStore, $location, $http,Quien) {
       	$scope.usuario=Quien.query();
       }]);
app.controller('InscriptosMateriaController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','Quien',
                                          function($scope, $rootScope, $cookieStore, $location, $http,Quien) {
       	$scope.usuario=Quien.query();
       }]);
app.controller('InscriptosCursoController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','Quien',
                                          function($scope, $rootScope, $cookieStore, $location, $http,Quien) {
       	$scope.usuario=Quien.query();
       }]);
app.controller('AnaliticoController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','Quien',
                                       'FactoryBusquedaAlumnoDNI', 'FactoryBusquedaExamenPorAlumno',
                                          function($scope, $rootScope, $cookieStore, $location, $http,Quien,
                                        		  FactoryBusquedaAlumnoDNI,FactoryBusquedaExamenPorAlumno) {
       	$scope.usuario=Quien.query();
        $scope.buscarAlumno = function (dni) {
        	$scope.alumnos=FactoryBusquedaAlumnoDNI.buscarPorDNI({d: dni})
        };
       }]);

app.controller('AnaliticoListController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','$routeParams','Quien',
                                           'FactoryBusquedaExamenPorAlumno','FactoryBusquedaMateriaPorExamen','AlumnoFactory',
                                          function($scope, $rootScope, $cookieStore, $location, $http,$routeParams,Quien,
                                        		  FactoryBusquedaExamenPorAlumno,FactoryBusquedaMateriaPorExamen,AlumnoFactory) {
       	$scope.usuario=Quien.query();
       	$scope.alumno=AlumnoFactory.show({id: $routeParams.id});
        if ($routeParams.id != null) {
	    	$scope.examenes = FactoryBusquedaExamenPorAlumno.buscarPorAlumno({ida: $routeParams.id});
	    } else {

	    };
       }]);



app.controller('CrearFinalController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','$routeParams','Quien',
                                        'CursosPorUsuario','CrearFinal',
                                          function($scope, $rootScope, $cookieStore, $location, $http,$routeParams,Quien,
                                        		  CursosPorUsuario,CrearFinal) {
       	$scope.usuario=Quien.query();
       	$scope.buscarCursos=function (idUsuario) {
       		$scope.cursos=CursosPorUsuario.buscar({id:idUsuario});

	    };
	    $('.fecha').datepicker();


	    $scope.crearFinal=function (idCurso,fecha) {
       			CrearFinal.crear({idc: idCurso,f: fecha});

	    };

       }]);


app.controller('AnotarseController', ['$scope', '$rootScope', '$cookieStore', '$location', '$http','$routeParams','Quien',
                                        'CursosPorAlumno','Anotarse',
                                          function($scope, $rootScope, $cookieStore, $location, $http,$routeParams,Quien,
                                        		  CursosPorAlumno,Anotarse) {
       	$scope.usuario=Quien.query();
       	$scope.buscarPosiblesCursos=function (idUsuario) {
       		$scope.cursos=CursosPorAlumno.buscar({id:idUsuario});

	    };
	    $('.fecha').datepicker();

	    $scope.anotarse=function (idCurso,idUsuario) {
       			Anotarse.anotar({idc: idCurso,idu: idUsuario});

	    };

       }]);