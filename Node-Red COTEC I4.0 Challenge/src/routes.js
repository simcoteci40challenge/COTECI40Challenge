'use strict';

const express = require('express');
const Env = require('./enum/env').enum;
const debug = require('debug')('test:request');

const router = express.Router();

router.use(function (req, res, next) {
  if (req.app.get('env') === Env.DEVELOPMENT) {
    // do logging
    debug(JSON.stringify({uri: req.originalUrl, headers: req.headers, body: req.body}));
  }
  next();
});


module.exports = router;
