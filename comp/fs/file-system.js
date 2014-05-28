define(function(require) {
  'use strict';
  var DirectoryEntry = require('./directory-entry');

  function FileSystem(fs) {
    this._fs = fs;
    this.root = new DirectoryEntry(fs.root);
  }

  return FileSystem;
});
