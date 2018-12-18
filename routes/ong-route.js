'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ong-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:nome', controller.getByNome);
router.get('/admin/:cnpj', controller.getByCnpj);
router.get('/tipos/:tipo', controller.getByTipo);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;