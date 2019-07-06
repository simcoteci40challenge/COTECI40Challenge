'use strict';

const path = require('path');

const testPath = path.resolve(__dirname);
const basePath = path.join(testPath, '..');

// Change working dir to base path
process.chdir(basePath);

// Load env variables
const dotenvExpand = require('dotenv-expand');
dotenvExpand(require('dotenv').config({path: path.join(basePath, '.env.test')}));

// Load config variables
require('config');

// Force enable debug by DEBUG variable in .env.test
// require('debug').enable(process.env.DEBUG);

module.exports = {
  basePath: basePath,
  testPath: testPath
};
