define(function(require) {
  'use strict';
  var localForage = require('localforage');
  var guuid = require('./guuid');
  var File = require('./file');
  var metakey = 'metadata|';


  function get(id) {
    return localForage.getItem(metakey + id).then(function(metadata) {
      return new File(metadata);
    });
  }

  function set(metadata, blob) {
    var id = guuid();
    metadata.id = id;
    metadata.type = metadata.type || blob.type;
    metadata.size = metadata.size || blob.size;

    return localForage.setItem(metakey + id, metadata).then(function() {
      var file = new File(metadata);
      return file.setContent(blob);
    });
  }

  function remove(id) {
    return get(id).then(function(file) {
      return Promise.all([
        file.remove(),
        localForage.removeItem(metakey + id),
      ]);
    });
  }

  function list() {
    return localForage.length().then(function(length) {
      var result = [];

      function iterator(index) {
        if (index >= length)
          return result;

        return localForage.key(index).then(function(key) {
          if (key.indexOf(metakey) === 0)
            result.push(key.substr(metakey.length));

          return iterator(index + 1);
        });
      }

      return iterator(0);
    });
  }


  return {
    get: get,
    set: set,
    remove: remove,
    list: list,
  };
});
