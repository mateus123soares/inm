const { Router } = require('express');

const routes = Router();

const indexController = require('../api/controllers/Index/indexController');

// EXEMPLO DE ROTA COMUM
routes.get('/', indexController.index);

module.exports = routes;
