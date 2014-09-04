'use strict';

/* Filters */

var appDir = angular.module('ngdemo.filters', []);

appDir.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);


appDir.filter('formatDate',function(){
	
	return function(data){
		var result=formatDate(String(data));
		return result;};  
});