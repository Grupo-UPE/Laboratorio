'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers.entrevistas', []);
// Clear browser cache (in development mode)



app.controller('generarEntrevistaCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        'detalleBusquedaService','$route','$routeParams','postulanteShowUpdateService','entrevistaCreateService','$sce',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    detalleBusquedaService,$route,$routeParams,postulanteShowUpdateService,entrevistaCreateService,$sce) {
            $scope.iframeCalendar="";
            $scope.busqueda=detalleBusquedaService.query({id:$routeParams.idBusqueda},function(){//Para poder sacar los entrevistadores
                var src="&src=4aik347gtqu1umje7kggphnsg4%40group.calendar.google.com&amp;";
                for (var i = 0; i < $scope.busqueda.entrevistadores.length; i++) {
                    src=src+"&src="+$scope.busqueda.entrevistadores[i].email+"&amp";
                }
                $scope.iframeCalendar=$sce.trustAsResourceUrl("https://www.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src="+src+";ctz=America%2FArgentina%2FBuenos_Aires");
            });

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
                entrevistaCreateService.create({entrevista:$scope.entrevista,
                            busqueda:$scope.busqueda,postulante:$scope.postulante},function(){
                    $location.path('/');
                    })}

}]);

app.controller('entrevistasUsuarioCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        '$route','$routeParams','entrevistasUsuario','$sce','$modal',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    $route,$routeParams,entrevistasUsuario,$sce,$modal) {

            $scope.entrevistas=entrevistasUsuario.query();
            $scope.iframesrc= function(){
                return $sce.trustAsResourceUrl("https://www.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src="+$scope.usuario.email+"&amp;ctz=America%2FArgentina%2FBuenos_Aires");
            }
            //Modal para ver los posibles postulantes.
        $scope.openModalEntrevista = function (entrevista) {

                $scope.entrevista=entrevista;


            var modal = $modal.open({
              templateUrl: '/partials/modalEntrevista.html',
              controller: 'modalEntrevistas',
              size: 'lg',
              resolve: {
                entrevista:function(){
                    return entrevista;
                },
              }
            });

            modal.result.then(function (selectedItem) {
              console.log('modal cerrado');
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
            });
          };

}]);

app.controller('modalEntrevistas',
    function ($scope, $modalInstance, entrevista, guardarFeedback) {

      $scope.entrevista = entrevista;
      $scope.guardar = function(){
            guardarFeedback.guardar({entrevista:$scope.entrevista._id, semaforo:$scope.entrevista.semaforo,
                            comentario:$scope.entrevista.comentario});
            $modalInstance.close('');
      }

 $scope.ok = function () {
    $modalInstance.close('cerrado');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


app.controller('entrevistasFuturasCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        '$route','$routeParams','entrevistasFuturas','$sce',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    $route,$routeParams,entrevistasFuturas,$sce) {

            $scope.entrevistas=entrevistasFuturas.query();
}]);

app.controller('entrevistasUsuarioSinFeedbackCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        '$route','$routeParams','entrevistasUsuarioSinFeedback','$sce','$modal',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    $route,$routeParams,entrevistasUsuarioSinFeedback,$sce,$modal) {

            $scope.entrevistas=entrevistasUsuarioSinFeedback.query();
             $scope.openModalEntrevista = function (entrevista) {

                $scope.entrevista=entrevista;


            var modal = $modal.open({
              templateUrl: '/partials/modalEntrevista.html',
              controller: 'modalEntrevistas',
              size: 'lg',
              resolve: {
                entrevista:function(){
                    return entrevista;
                },
              }
            });

            modal.result.then(function (selectedItem) {
              console.log('modal cerrado');
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
            });
          };
}]);

app.controller('entrevistasSinFeedbackCTRL', ['$scope', '$rootScope', '$cookieStore', '$location', '$http',
                        '$route','$routeParams','entrevistasSinFeedback','$sce',
                                   function($scope, $rootScope, $cookieStore, $location, $http,
                                    $route,$routeParams,entrevistasSinFeedback,$sce) {

            $scope.entrevistas=entrevistasSinFeedback.query();
}]);



