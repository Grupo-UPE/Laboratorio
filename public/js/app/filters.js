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

appDir.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=1; i<=total; i++)
      input.push(i);
    return input;
  };
});