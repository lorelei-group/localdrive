define(function(require) {
  'use strict';
  var descriptors = require('tools/descriptors');
  var promify = require('./promify');


  function Entry(dom) {
    this._dom = dom;
  }


  Object.defineProperties(Entry.prototype, descriptors({

    remove: promify(function(resolve, reject) {
      this._dom.remove(resolve, reject);
    }),

  }));


  return Entry;
});
