define(function(require) {
  'use strict';
  var Entry = require('comp/fs/entry');
  var FileReader = require('comp/fs/file-reader');
  var FS = require('comp/fs/fs');
  var size = 0;
  var files = {};

  function cast(obj) {
    if (obj instanceof Promise)
      return obj;

    return Promise.resolve(obj);

    //return Promise.cast(obj instanceof Entry ? obj : get(obj));
  }

  function get(id) {
    return FS.persistent(0).then(function(fs) {
      return fs.root.getFile(id, { create: false });
    });
  }

  function getContent(id) {
    return cast(id).then(function(fileEntry) {
      return fileEntry.file();
    }).then(function(file) {
      var reader = new FileReader();
      return reader.readAsDataURL(file);
    });
  }

  function save(id, file) {
    size += file.size;

    return FS.persistent(size).then(function(fs) {
      return fs.root.getFile(id, { create: true });
    }).then(function(fileEntry) {
      files[id] = fileEntry;
      return fileEntry.createWriter();
    }).then(function(writer) {
      return writer.write(file);
    });
  }

  function remove(id) {
    return cast(id).then(function(entry) {
      delete files[id];
      return entry.remove();
    });
  }


  function getAll() {
    return FS.persistent(0).then(function(fs) {
      var reader = fs.root.createReader();
      return reader.readEntries().then(function listener(results) {
        if (!results.length)
          return files;

        results.forEach(function(file) {
          files[file.name] = file;
        });

        return reader.readEntries().then(listener);
      });
    });
  }

  window.files = files;
  getAll();


  return {
    getContent: getContent,
    getAll: getAll,
    get: get,
    save: save,
    remove: remove,
  };
});
