'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('map-files', 'mapFiles');
require('extend-shallow', 'extend');
require('camel-case', 'camelcase');
require('read-yaml', 'yaml');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
