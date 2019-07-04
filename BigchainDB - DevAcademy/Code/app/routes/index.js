'use strict';

//module.exports = morgan
const express = require('express');
const routes = module.exports = express();

// Dependencies
const logger = require('../utils/logger');

// Routes
// const auth = require('./auth');
// const docs = require('./docs');
const keys = require('./keys');
const entities = require('./entities');
const blockchain = require('./blockchain');
const test = require('./test');

// routes.use(express.static(__dirname + '/docs'));
// routes.use('/docs', docs);
// routes.use('/auth', auth);
// routes.use(auth.verifyToken);
routes.use('/api', keys);
routes.use('/api', entities);
routes.use('/api', blockchain);
routes.use('/api', test);

// If no route is matched by now, return API version
routes.use(function (req, res) {
    logger.info('Wrong end point: ' + req.originalUrl)
    res.status(404)
    res.json({
      'api_endpoint': '/api/' + config.API_VERSION,
      'request': req.originalUrl
    });
});