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

