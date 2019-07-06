'use strict';

var util = require('util');
var PublicError = require('./PublicError');

/**
 * NotFoundException
 * @param message
 * @constructor
 */
function NotFoundException(message) {
  message = message || 'Not Found';

  // Super Class Error
  PublicError.call(this, message, 404);
}

util.inherits(NotFoundException, PublicError);

module.exports = NotFoundException;
