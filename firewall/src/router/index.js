const { Router } = require('express');

const routes = Router();

const indexController = require('../api/controllers/Index/indexController');
const serviceController = require('../api/controllers/Grafana/grafanaController');

// EXEMPLO DE ROTA COMUM
routes.get('/', indexController.index);

routes.post('/grafana/new', serviceController.createDashboard);

module.exports = routes;
