'use strict';

/* Directives */

var appDir = angular.module('ngdemo.directives', []);

appDir.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);


appDir.directive('modal', function () {
    return {
      template: '<div class="modal fade">' +
          '<div class="modal-dialog">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title">{{ title }}</h4>' +
              '</div>' +
              '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
          '</div>' +
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
 
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });
 
        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });
 
        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });




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

