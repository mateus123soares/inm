const { Router } = require('express');

const routes = Router();

const zabbixController = require('../api/controllers/Zabbix/zabbixController.js');

routes.get('/token', zabbixController.getApiToken);
routes.post('/host/new', zabbixController.createNewHost);
routes.post('/host/get', zabbixController.getHost);


module.exports = routes;
