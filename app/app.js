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
  });

  angular.bootstrap(document, [ 'localdrive' ]);
});
