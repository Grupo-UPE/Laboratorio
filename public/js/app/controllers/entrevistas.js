'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.entrevistas', []);
// Clear browser cache (in development mode)



app.controller('generarEntrevistaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'detalleBusquedaService','$route','$routeParams','postulanteShowUpdateService','entrevistaCreateService',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    detalleBusquedaService,$route,$routeParams,postulanteShowUpdateService,entrevistaCreateService) {

            $scope.busqueda=detalleBusquedaService.query({id:$routeParams.idBusqueda});

//Date picker
  $scope.today = function() {
    $scope.dt = new Date();

  };
  $scope.time = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
    $scope.myTime=null;
  };
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };$scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd/mm/yyyy hh:mm'];
  $scope.format = $scope.formats[0];
  //Fin datepicker

  //timepicker

$scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime);
  };


  //timepicker

            $scope.postulante=postulanteShowUpdateService.show({id:$routeParams.idPostulante});
            $scope.generarEntrevista=function(){
                entrevistaCreateService.create({entrevista:$scope.entrevista,busqueda:$scope.busqueda,postulante:$scope.postulante});}

}]);

app.controller('entrevistasUsuarioCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        '$route','$routeParams','entrevistasUsuario','$sce',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    $route,$routeParams,entrevistasUsuario,$sce) {

            $scope.entrevistas=entrevistasUsuario.query();
            $scope.iframesrc= function(){
                return $sce.trustAsResourceUrl("https://www.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src="+$scope.usuario.email+"&amp;ctz=America%2FArgentina%2FBuenos_Aires");
            }

}]);

app.controller('entrevistasFuturasCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        '$route','$routeParams','entrevistasFuturas','$sce',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    $route,$routeParams,entrevistasFuturas,$sce) {

            $scope.entrevistas=entrevistasFuturas.query();
}]);
