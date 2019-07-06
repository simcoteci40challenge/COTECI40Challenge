'use strict';

var util = require('util');
require('../utils/generateProperty');

/**
 * PublicError
 * @param {String} [message=Public Error]
 * @param {int} [status=404]
 * @param {Error} [err]
 * @constructor
 */
function PublicError(message, status, err) {
  this.name = this.constructor.name;
  this.message = message || 'Public Error';
  this.status = status || 404;

  // Capture stacktrace
  Error.captureStackTrace(this, this.constructor);

  if (err instanceof Error) {
    // Contact previous stack error
    this.description = err.message;
    this.stack += '\nFrom previous event: ' + err.stack;
  }
}

/**
 * @property public
 */
PublicError.generateProperty('public', {
  defaultValue: true,
  get: true,
  set: false
});

/**
 * Helper for JSON.stringify
 */
PublicError.prototype.toJSON = function () {
  var error = Object.assign({}, this);
  delete error.stack;
  return error;
};

/**
 * inspect helper
 */
PublicError.prototype.inspect = function () {
  return this.stack;
};

/**
 * Inherits from Error.
 */
util.inherits(PublicError, Error);

/**
 * Module exports
 */
module.exports = PublicError;
