var fs = require('fs');
var path = require('path');
var through = require('through2');

var template = fs.readFileSync(path.join(__dirname, 'template.js'));

module.exports = function () {
  'use strict';

  return through.obj(function (file, encoding, callback) {
    var contents = template.toString(encoding)
        .replace('/*{{NAME}}*/', file.relative.replace(/\/index.js|.js/, ''))
        .replace('/*{{MODULE}}*/', file.contents.toString());

    file.contents = new Buffer(contents);

    this.push(file);

    callback();
  });
};

