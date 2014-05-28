define(function(require) {
  'use strict';
  require('./idb.filesystem');
  var promify = require('./promify');
  var FileSystem = require('./file-system');
  var requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;


  function requestPersistentQuota(size) {
    return new Promise(function(resolve, reject) {
      if (!navigator.webkitPersistentStorage)
        return resolve(size);

      navigator.webkitPersistentStorage.requestQuota(size, resolve, reject);
    });
  }
  function requestTemporaryQuota(size) {
    return new Promise(function(resolve, reject) {
      if (!navigator.webkitTemporaryStorage)
        return resolve(size);

      navigator.webkitTemporaryStorage.requestQuota(size, resolve, reject);
    });
  }

  function requestFS(type, size) {
    return new Promise(function(resolve, reject) {
      requestFileSystem(type, size, function(fs) {
        resolve(new FileSystem(fs));
      }, reject);
    });
  }

  function requestPersistent(size) {
    return requestPersistentQuota(size).then(function(granted) {
      return requestFS(window.PERSISTENT, size).then(function(fs) {
        fs._granted = granted;
        return fs;
      });
    });
  }

  function requestTemporary(size) {
    return requestTemporaryQuota(size).then(function(granted) {
      return requestFS(window.TEMPORARY, size).then(function(fs) {
        fs._granted = granted;
        return fs;
      });
    });
  }

  function asyncWrapper(fn) {
    promify.setWrapper(fn);
  }


  requestFS.asyncWrapper = asyncWrapper;
  requestFS.persistent = requestPersistent;
  requestFS.temporary = requestTemporary;
  requestFS.fs = requestFS;
  return requestFS;
});
