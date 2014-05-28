define(function(require) {
  'use strict';
  var descriptors = require('tools/descriptors');
  var promify = require('./promify');
  var Entry = require('./entry');
  var FileWriter = require('./file-writer');


  function FileEntry(file) {
    Entry.call(this, file);
  }


  FileEntry.prototype = Object.create(Entry.prototype, descriptors({
    constructor: FileEntry,

    get name() {
      return this._dom.name;
    },

    file: promify(function(resolve, reject) {
      this._dom.file(resolve, reject);
    }),

    createWriter: promify(function(resolve, reject) {
      this._dom.createWriter(function(writer) {
        resolve(new FileWriter(writer));
      }, reject);
    }),
  }));


  return FileEntry;
});
