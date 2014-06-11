define(function(require) {
  'use strict';
  require('app-module');
  require('comp/main/main');


  var angular = require('angular');
  angular.module('localdrive')

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'comp/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function($rootScope) {
    var originalThen = Promise.prototype.then;
    Promise.prototype.then = function(success, error) {
      function wrapper(value) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest')
          return success(value);

        var result;
        $rootScope.$apply(function() { result = success(value) });
        return result;
      }

      return originalThen.call(this, success && wrapper, error);
    };
  });

  angular.bootstrap(document, [ 'localdrive' ]);
});
