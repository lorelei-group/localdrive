define(function(require) {
  'use strict';
  var descriptors = require('tools/descriptors');
  var promify = require('./promify');
  var Entry = require('./entry');
  var FileEntry = require('./file-entry');
  var DirectoryReader = require('./directory-reader');


  function DirectoryEntry(dir) {
    Entry.call(this, dir);
  }


  DirectoryEntry.prototype = Object.create(Entry.prototype, descriptors({
    constructor: DirectoryEntry,

    getFile: promify(function(resolve, reject, name, options) {
      this._dom.getFile(name, options, function(file) {
        resolve(new FileEntry(file));
      }, reject);
    }),

    createReader: function() {
      return new DirectoryReader(this._dom.createReader());
    }
  }));


  return DirectoryEntry;
});
