define(function(require) {
  'use strict';
  var descriptors = require('tools/descriptors');
  var promify = require('./promify');


  function FileReader() {
    var reader = new window.FileReader();
    this._dom = reader;

    this.promise = promify.createPromise(function(resolve, reject) {
      reader.addEventListener('error', reject);
      reader.addEventListener('load', function(event) {
        resolve(reader.result);
      });
    }.bind(this));
  }


  Object.defineProperties(FileReader.prototype, descriptors({

    get onload() {
      return this._dom.onload;
    },
    set onload(value) {
      this._dom.onload = value;
    },

    get onerror() {
      return this._dom.onerror;
    },
    set onerror(value) {
      this._dom.onerror = value;
    },

    readAsDataURL: function(data) {
      this._dom.readAsDataURL(data);
      return this.promise;
    },
  }));


  return FileReader;
});
