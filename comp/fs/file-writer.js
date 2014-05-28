define(function(require) {
  'use strict';
  var descriptors = require('tools/descriptors');
  var promify = require('./promify');


  function FileWriter(dom) {
    this._dom = dom;
    this.promise = promify.createPromise(function(resolve, reject) {
      this._dom.addEventListener('error', reject);
      this._dom.addEventListener('writend', function() {
        resolve();
      });
    }.bind(this));
  }


  Object.defineProperties(FileWriter.prototype, descriptors({

    get onwriteend() {
      return this._dom.onwriteend;
    },
    set onwriteend(value) {
      this._dom.onwriteend = value;
    },

    get onerror() {
      return this._dom.onerror;
    },
    set onerror(value) {
      this._dom.onerror = value;
    },

    write: function(data) {
      this._dom.write(data);
      return this.promise;
    },
  }));


  return FileWriter;
});
