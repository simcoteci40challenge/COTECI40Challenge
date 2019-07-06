'use strict';

const path = require('path');

module.exports = {
  app: {},
  https: {
    enabled: process.env.HTTPS_ENABLED === 'true',
    ca: process.env.HTTPS_CA ? process.env.HTTPS_CA : 'fullchain.pem',
    cert: process.env.HTTPS_CERT ? process.env.HTTPS_CERT : 'cert.pem',
    key: process.env.HTTPS_KEY ? process.env.HTTPS_KEY : 'privkey.pem'
  },
  nodeRed: {
    uiPort: process.env.PORT || 1880,
    mqttReconnectTime: 15000,
    serialReconnectTime: 15000,
    debugMaxLength: 1000,
    flowFilePretty: true,
    credentialSecret: "6d1db55704a44cbc78833d6e9a706c844051a0b6",
    coreNodesDir: path.resolve('./node_modules/@node-red/nodes'),
    userDir: path.resolve('./node-red'),
    httpNodeRoot: "/api",
    httpAdminRoot: "/",
    httpNodeCors: {
      origin: "*",
      methods: "GET,PUT,POST,DELETE"
    },
    exportGlobalContextKeys: true,
    logging: {
      console: {
        level: "info",
        metrics: false,
        audit: false
      }
    },
    editorTheme: {
        page: {
        title: 'COTEC I4.0 Challenge'
      },
      header: {
        title: 'COTEC I4.0 Challenge',
		image: '__dirname + ..\\logo\\logo.png'	
      },
      logout: {
        redirect: "/"
      },
      projects: {
        enabled: true
      }
    }
  }
};
