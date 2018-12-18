'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');
const controller = require('../controllers/doacao-controller');

router.post('/', authService.authorize, controller.post);
router.get('/', authService.authorize, controller.get);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router;