/*!
 * file-reader <https://github.com/jonschlinkert/file-reader>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var utils = require('./utils');

function readFiles(patterns, options) {
  var defaults = {};
  defaults.renameKey = function(file) {
    return utils.camelcase(file.stem);
  };
  defaults.decorate = { content: readFiles.file };
  return utils.mapFiles(patterns, utils.extend(defaults, options));
}

/**
 * Expose `file`
 */

readFiles.file = function(file, options) {
  if (typeof file === 'string') {
    file = utils.mapFiles(file, options)[file];
  }
  if (!file.extname) return file.content;
  return reader[file.extname](file.path, options);
};

/**
 * This is just a minimal start, pull requests welcome
 * for adding extensions/readers to the list.
 *
 * @param {String} `ext`
 * @return {Function} The file reader to use for the given `ext`
 * @api private
 */

var reader = {
  // requireable
  '.js': require,
  '.json': require,

  // common string formats
  '.txt': readString,
  '.md': readString,
  '.markdown': readString,
  '.mdown': readString,

  '.hbs': readString,
  '.htm': readString,
  '.html': readString,
  '.slim': readString,
  '.swig': readString,
  '.tmpl': readString,

  '.css': readString,
  '.less': readString,
  '.sass': readString,
  '.scss': readString,
  '.styl': readString,

  // common object formats
  '.yaml': readYaml,
  '.yml': readYaml
};

function readString(fp) {
  return fs.readFileSync(fp, 'utf8');
}

function readYaml(fp, options) {
  return utils.yaml.sync(fp);
}

/**
 * Expose `readFiles`
 */

module.exports = readFiles;
