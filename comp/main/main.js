define(function(require) {
  'use strict';
  require('app-module');
  require('tools/file-selector');
  require('./bytes-filter');

  //var onError = console.error.bind(console);
  var onError = function(error) {debugger};
  var fs = require('comp/storage/storage');
  var angular = require('angular');
  angular.module('localdrive')

  .controller('MainCtrl', function($scope) {
    var isImage = /^image\//;
    var isAudio = /^audio\//;
    var isVideo = /^video\//;
    var dom = {
      image: document.querySelector('img'),
      audio: document.querySelector('audio'),
      video: document.querySelector('video'),
    };

    $scope.save = save;
    $scope.remove = remove;
    $scope.select = select;

    function getList() {
      return fs.list().then(function(ids) {
        Promise.all(ids.map(fs.get)).then(function(files) {
          $scope.files = files;
        });
      });
    }

    getList().catch(onError);

    function save(files) {
      fs.set({ path: $scope.name }, files[0])
        .then(getList)
        .catch(onError);
      $scope.name = '';
    }

    function remove(file) {
      fs.remove(file.id)
        .then(getList)
        .catch(onError);
    }

    function select(file) {
      file.getUrl()
        .then(function(url) {
          console.log(file.type);

          var type = 'unknown';
          if (isImage.test(file.type))
            type = 'image';
          else if (isAudio.test(file.type))
            type = 'audio';
          else if (isVideo.test(file.type))
            type = 'video';

          if (type === 'unknown')
            return;

          dom[type].src = url;
          $scope.preview = type;
        })
        .catch(onError);
    }
  });
});
