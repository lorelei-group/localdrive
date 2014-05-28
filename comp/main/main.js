define(function(require) {
  'use strict';
  require('app-module');
  require('tools/file-selector');
  require('./bytes-filter');

  var onError = console.error.bind(console);

  var FS = require('./storage');
  var angular = require('angular');
  angular.module('localdrive')

  .run(function($rootScope) {
    require('comp/fs/fs').asyncWrapper(function(resolve, result) {
      $rootScope.$apply(function() {
        resolve(result);
      });
    });
  })

  .controller('MainCtrl', function($scope) {
    window.fs = FS;

    var img = document.querySelector('video');

    $scope.upload = function(files) {
      FS.save($scope.name, files[0]);
    };

    $scope.remove = FS.remove;

    FS.getAll().then(function(files) {
      $scope.$apply(function() {
        $scope.files = files;
      });
    }).catch(onError);

    $scope.select = function(fileEntry) {
      /*
      fileEntry.file().then(function(file) {
        img.src = URL.createObjectURL(file);
      }).catch(function(error) {
        debugger;
      });
      */

      FS.getContent(fileEntry).then(function(content) {
        img.src = content;
      }).catch(function(error) {
        debugger;
      });
    }
  });
});
