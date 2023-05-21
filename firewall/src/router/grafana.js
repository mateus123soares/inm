const { Router } = require('express');

const routes = Router();

const grafanaController = require('../api/controllers/Grafana/grafanaController');

routes.post('/alerts', grafanaController.reciveAlert);

module.exports = routes;
