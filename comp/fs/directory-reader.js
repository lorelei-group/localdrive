define(function(require) {
  'use strict';
  var descriptors = require('tools/descriptors');
  var promify = require('./promify');
  var FileEntry = require('./file-entry');

  function createFileEntry(file) {
    return new FileEntry(file);
  }


  function DirectoryReader(dom) {
    this._dom = dom;
  }


  Object.defineProperties(DirectoryReader.prototype, descriptors({

    readEntries: promify(function(resolve, reject) {
      this._dom.readEntries(function(results) {
        resolve(results.map(createFileEntry));
      }, reject);
    }),

  }));


  return DirectoryReader;
});
