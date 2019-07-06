'use strict';

// Load env variables
const dotenvExpand = require('dotenv-expand');
dotenvExpand(require('dotenv').config());

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const logger = require('morgan');
const debug = require('debug')('cotec:app');
const bodyParser = require('body-parser');
const Env = require('./enum/env').enum;
const NotFoundException = require('./exceptions/NotFoundException');
const config = require('config');

const app = express();

/* Expose */
module.exports = app;

const server = require('./server')(app);

app.disable('etag');
app.disable('x-powered-by');

app.use(compression({threshold: 0}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

if (app.get('env') === Env.DEVELOPMENT) {
  app.use(logger('dev'));
}

// Start Server
const appServer = server.createServer(false);

// Routes
app.use('/', require('./routes'));

// Create and Start NodeRED Instance
require('./node-red')(appServer, app, config.get('nodeRed'))
  .then(function () {
    return server.listen(appServer);
  })
  .catch(function (error) {
    console.error(error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new NotFoundException());
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === Env.DEVELOPMENT || err.public ? err : {};
  debug(err.stack);
  // render the error page
  res.status(err.status || 500);
  res.json(res.locals);
});
