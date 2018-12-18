'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/doador-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post);
router.get('/admin/:cpf', controller.getByCpf);
router.get('/', controller.get);
router.put('/:id', controller.put);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);
router.delete('/:cpf', controller.delete);

module.exports = router;