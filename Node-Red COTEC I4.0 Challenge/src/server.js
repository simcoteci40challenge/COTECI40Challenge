/* eslint-disable no-process-exit,no-unreachable */
'use strict';

/**
 *  @module app/server
 */

/**
 * Module dependencies.
 */

const debug = require('debug')('cotec:server');
const http = require('http');
const https = require('https');
const fs = require('fs');
const httpsConfig = require('config').https;
const Env = require('./enum/env').enum;

let server;

/**
 * @param app
 * @returns {Server}
 */
module.exports = function (app) {
  server = server || new Server(app);
  return server;
};

/**
 * Server
 * @param app
 * @constructor
 */
function Server(app) {
  /* Save app reference. */
  this.app = app;

  /* Get port from environment and store in Express. */
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  /* Normalize a port into a number, string, or false. */
  function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }
}

/**
 * creat http or https server
 * @method createServer
 * @param listen
 * @return {Server}
 */
Server.prototype.createServer = function (listen) {
  const _app = this.app;

  /* Create HTTP server. */
  const server = createServer(_app);

  if (listen) {
    this.listen(server);
  }

  return server;

  /* Create http (development) or https (production) server based on NODE_ENV */
  function createServer(app) {
    if (process.env.NODE_ENV === Env.DEVELOPMENT || process.env.NODE_ENV === Env.TEST || !httpsConfig.enabled) {
      return http.createServer(app);
    }

    const options = {
      ca: fs.readFileSync(httpsConfig.ca),
      cert: fs.readFileSync(httpsConfig.cert),
      key: fs.readFileSync(httpsConfig.key)
    };
    return https.createServer(options, app);
  }
};

Server.prototype.listen = function (server) {
  const _app = this.app;

  /* Listen on provided port, on all network interfaces. */
  server.listen(_app.get('port'));
  server.on('error', onError);
  server.on('listening', onListening);

  return server;

  /* Event listener for HTTP server "error" event. */
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + _app.get('port')
      : 'Port ' + _app.get('port');

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        debug(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        debug(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /* Event listener for HTTP server "listening" event. */
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind + ' (' + _app.get('env') + ')');
  }
};
