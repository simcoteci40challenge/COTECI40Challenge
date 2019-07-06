'use strict';

var lodash = require('lodash');

module.exports.enum = Object.freeze({
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production'
});

module.exports.values = lodash.values(module.exports.enum);
