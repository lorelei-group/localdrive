define(function() {
  'use strict';

  function descriptors(obj) {
    var dtors = {};

    Object.keys(obj).forEach(function(key) {
      dtors[key] = Object.getOwnPropertyDescriptor(obj, key);
    });

    return dtors;
  }

  return descriptors;
});
