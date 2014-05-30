define(function(require) {
  'use strict';

  function persistent(size, resolve, reject) {
    navigator.webkitPersistentStorage.requestQuota(size, function() {
      webkitRequestFileSystem(PERSISTENT, size, resolve, reject);
    }, reject);
  }

  function getItem(id) {
    return new Promise(function(resolve, reject) {
      persistent(0, function(fs) {
        fs.root.getFile(id, { create: false }, function(fileEntry) {
          fileEntry.file(resolve, reject);
        }, reject);
      }, reject);
    });
  }

  function setItem(id, value) {
    return new Promise(function(resolve, reject) {
      persistent(0, function(fs) {
        fs.root.getFile(id, { create: true }, function(fileEntry) {
          fileEntry.createWriter(function(writer) {
            writer.onwriteend = function() { resolve() };
            writer.onerror = reject;
            writer.write(value);
          }, reject);
        }, reject);
      }, reject);
    });
  }

  function removeItem(id) {
    return new Promise(function(resolve, reject) {
      persistent(0, function(fs) {
        fs.root.getFile(id, { create: false }, function(fileEntry) {
          fileEntry.remove(resolve, reject);
        }, reject);
      }, reject);
    });
  }

  /*
  function listFiles() {
    return new Promise(function(resolve, reject) {
      var files = [];
      var reader = fs.root.createReader();

      function listener(results) {
        if (!results.length) return resolve(files);
        results.forEach(function(file) { files.push(file.name) });
        reader.readEntries(listener, reject);
      }

      reader.readEntries(listener, reject);
    });
  }
  */

  return {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
  };
});
