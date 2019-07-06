'use strict';

/**
 * Module dependencies.
 */
const RED = require("node-red");

/**
 * Start Node Red
 * @param appServer
 * @param app
 * @param settings
 * @return {*}
 */
module.exports = function (appServer, app, settings) {
  const _settings = Object.assign({}, settings, {});

  RED.init(appServer, _settings);

  app.use(settings.httpAdminRoot, RED.httpAdmin);
  app.use(settings.httpNodeRoot, RED.httpNode);

  return RED.start();
};
