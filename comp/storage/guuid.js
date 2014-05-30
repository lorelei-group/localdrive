define(function(require) {
  'use strict';
  var chars = '0123456789' +
    'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function randChar() {
    var max = chars.length;
    return chars[Math.round(Math.random() * max)];
  }

  function guuid() {
    var id = 'FSID-';
    for (var i = 0; i < 10; i++)
      id += randChar();
    return id;
  }

  return guuid;
});
