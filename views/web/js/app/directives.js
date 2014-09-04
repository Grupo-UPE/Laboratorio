'use strict';

/* Directives */
    
var appDir = angular.module('ngdemo.directives', []);
	
appDir.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

appDir.directive('datatables', function initialize($compile) {
	return { 
		link: function (scope, element, attrs) {
			// apply DataTable options, use defaults if none specified by user
			var options = {
				"bPaginate": true,
	    		"bProcessing": true,
	    		"bServerSide": true,
	    		"bStateSave": true,
	    		"bSearch": false,
	    		"sDom": '<"top"l>rt<"bottom"ip><"clear">',
	    		"sServerMethod": "POST",
	    		"sAjaxSource": url,
	    		"sAjaxDataProp": "data",
	    		"sEcho": "1",
	    		"sPaginationType": "four_button",
	    		"aLengthMenu": [[5, 10, 20, 50, -1],[5, 10, 20, 50, "Todo"]],
	    		"iDisplayStart": 0,
	    		"iDisplayLength": 10,
	    		"oLanguage": {
	    			"sUrl": "lenguaje.txt",
	    		},
	    		"aaSorting": initialOrder,
	    		"aoColumns": columns,
	    		// esta funcion es para que funcione con Datatables, debido a que Angular no reconoce las filas insertadas en el DOM en forma dinamica por Datatables
	    		"fnCreatedRow": function (nRow, aData, iDataIndex) {
	    			addActions(aData, nRow);
	    			$compile(nRow)(scope);
	    		},
	        };
	        
			// apply the plugin
	        var oTable = element.dataTable(options);
	        
	        $("#btnApplyFilters").click(function () {
	        	var filters = new Array();	
			    $("#exampleFilters tbody").each(function (i) {
					// esto es porque la tabla de filtros tiene mas de una fila
					for (var r=0; r<this.rows.length; r++) {
						// recupero el valor de cada columna de cada fila
						for (var c=0; c<this.rows.item(r).cells.length; c++) {
							// campo 1 de los children es el componente que contiene el valor para la busqueda, el 0 es el label
							if (this.rows.item(r).cells[c].children[1]!=undefined) { //IF == FIX para las búsquedas por fecha porque el datepicker inserta otros TDs
								var valor = this.rows.item(r).cells[c].children[1].value;
								filters.push(valor);
							}
						}
					}
			    });
			    oTable.fnArrayFilter(filters);
			});
			
			$("#btnClearFilters").click(function () {
				oTable.fnFilterClear();
			});
			
			// esto es para que cuando se carga la grilla se limpien los filtros, de manera que no queden pre-cargados con valores de otros requerimientos 
			$("#btnClearFilters").trigger("click");
			
	        // watch for any changes to our data, rebuild the DataTable
	        scope.$watch(attrs.aaData, function(value) {
	            var val = value || null;
	            if (val) {
	            	oTable.fnClearTable();
	            	oTable.fnAddData(scope.$eval(attrs.aaData));
	            }
	        });
	    }};
	});

appDir.directive('dateTimePicker', function() {
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	      recipient: '='
	    },
	    template:
	      '<div>' +
	      '<input type="text" readonly data-date-format="yyyy-mm-dd hh:ii" name="recipientDateTime" data-date-time required>'+
	      '</div>',
	    link: function(scope, element, attrs, ngModel) {
	      var input = element.find('input');
	 
	      input.datetimepicker({
	        format: "mm/dd/yyyy hh:ii",
	        showMeridian: true,
	        autoclose: true,
	        todayBtn: true,
	        todayHighlight: true
	      });
	 
	      element.bind('blur keyup change', function(){
	        scope.recipient.datetime = input.val();
	      });
	    }
	  }
	});

appDir.directive('alertMessage', function() {
	  return {
		restrict: 'E',
		replace: true,
	    template:
	      '<div class="alert alert-success" ng-show="message != null">' +
	      '<a class="close" data-dismiss="alert">×</a>  '+
	      '<strong>{{message}}</strong>'+
	      '</div>'
	    
	  };
	});

appDir.directive('alertError', function() {
	  return {
		restrict: 'E',
		replace: true,
	    template:
	      '<div class="alert alert-error" ng-show="error != null">' +
	      '<a class="close" data-dismiss="alert">×</a>  '+
	      '<strong>{{error}}</strong>'+
	      '</div>'
	  };
	});

appDir.directive('cuitcuilValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

            	var vec= Array(10);
    		    var esCuit=false;
    		    
    		    do {
    		    	viewValue = viewValue.replace('-','');
    		    	viewValue = viewValue.replace('_',''); //porque al final queda unn caracter _
    		    } while(viewValue.indexOf('-') >= 0);    
    		    
    		    if ( viewValue.length != 11) {  // si no estan todos los digitos
    		        esCuit=false;
    		    } else {
    		        var x=0;
    		        var dv=0;
    		        // Multiplico los dígitos.
    		        vec[0] = viewValue.charAt(  0) * 5;
    		        vec[1] = viewValue.charAt(  1) * 4;
    		        vec[2] = viewValue.charAt(  2) * 3;
    		        vec[3] = viewValue.charAt(  3) * 2;
    		        vec[4] = viewValue.charAt(  4) * 7;
    		        vec[5] = viewValue.charAt(  5) * 6;
    		        vec[6] = viewValue.charAt(  6) * 5;
    		        vec[7] = viewValue.charAt(  7) * 4;
    		        vec[8] = viewValue.charAt(  8) * 3;
    		        vec[9] = viewValue.charAt(  9) * 2;
    		                    
    		        // Suma cada uno de los resultado.
    		        for( var i = 0;i<=9; i++) {
    		            x += vec[i];
    		        }
    		        dv = (11 - (x % 11)) % 11;
    		        if ( dv == viewValue.charAt( 10) ) {
    		            esCuit=true;
    		        }
    		    }
    		    if (esCuit){
    		    	ctrl.$setValidity('validcuitcuil', true);
    		    	return viewValue; 
    		    } else {
    		    	ctrl.$setValidity('validcuitcuil', false);
    		    	return viewValue;
    		    }
    		    	
            });
        }
    };
});
