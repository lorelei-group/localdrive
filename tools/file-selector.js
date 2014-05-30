define(function(require) {
  'use strict';
  require('app-module');
  var angular = require('angular');
  angular.module('localdrive')

  .directive('mqFileSelector', function() {
    return {
      restrict: 'AE',
      scope: {
        mqFileSelect: '&',
      },

      link: function postLink(scope, element, attr) {
        element[0].addEventListener('click', function() {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');

          if ('multiple' in attr)
            input.setAttribute('multiple', true);

          input.click();
          input.addEventListener('change', function() {
            scope.mqFileSelect({ $files: input.files });
          });
        });
      },
    };
  });
});




