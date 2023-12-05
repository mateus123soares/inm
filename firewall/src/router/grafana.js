const { Router } = require('express');

const routes = Router();

const grafanaController = require('../api/controllers/Grafana/grafanaController');

routes.post('/alerts', grafanaController.reciveAlert);
routes.post('/new', grafanaController.createDashboard);

module.exports = routes;
