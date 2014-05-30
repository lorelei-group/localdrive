define(function(require) {
  'use strict';
  var descriptors = require('tools/descriptors');
  var isChrome = !!window.webkitRequestFileSystem;
  var fs = isChrome ? require('./fs-wrapper') : require('localforage');
  var filekey = 'filedata|';


  function File(data) {
    this.id = data.id;
    this.type = data.type;
    this.path = data.path;
    this.size = data.size;
  }



  Object.defineProperties(File.prototype, descriptors({

    getUrl: function() {
      return fs.getItem(filekey + this.id).then(function(blob) {
        return URL.createObjectURL(blob);
      });
    },

    getContent: function() {
      return fs.getItem(filekey + this.id).then(function(blob) {
        return new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onerror = reject;
          reader.onloadend = function() { resolve(reader.result) };
          reader.readAsDataURL(blob);
        });
      });
    },

    setContent: function(blob) {
      return fs.setItem(filekey + this.id, blob).then(function() {
        this.size = blob.size;
        return this;
      }.bind(this));
    },

    remove: function() {
      return fs.removeItem(filekey + this.id);
    },

  }));


  return File;
});
