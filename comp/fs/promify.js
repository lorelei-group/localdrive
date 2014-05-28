define(function() {
  'use strict';
  var wrapper;

  function promify(fn) {
    return function() {
      var self = this;
      var args = Array.prototype.slice.call(arguments);

      return createPromise(function(resolve, reject) {
        fn.apply(self, [ resolve, reject ].concat(args));
      });
    };
  }

  function createPromise(fn) {
    return new Promise(function(resolve, reject) {
        if (wrapper)
          resolve = wrapper.bind(null, resolve);
        fn(resolve, reject);
    });
  }

  function setWrapper(fn) {
    wrapper = fn;
  }

  promify.createPromise = createPromise;
  promify.setWrapper = setWrapper;
  return promify;
});
