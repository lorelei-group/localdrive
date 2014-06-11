define(function(require) {
  'use strict';
  var angular = require('angular');
  require('app-module');
  angular.module('localdrive')

  .filter('bytes', function() {
    var magnitudes = [ 'b', 'Kb', 'Mb', 'Gb', 'Tb' ];

    return function(value) {
      var magnitude = 0;

      while (value > 1024) {
        value /= 1024;
        magnitude++;
      }

      value = Math.round(value * 100) / 100;
      return value + ' ' + magnitudes[magnitude];
    };
  });
});
