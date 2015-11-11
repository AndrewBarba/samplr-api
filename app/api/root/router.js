"use strict";

const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Api root
router.get('/', controller.root);

// Api status
router.get('/status', controller.status);

module.exports = router;
