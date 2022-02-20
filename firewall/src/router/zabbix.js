const { Router } = require('express');

const routes = Router();

const zabbixController = require('../api/controllers/Zabbix/zabbixController.js');

routes.get('/', zabbixController.getApiToken);
routes.post('/host/new', zabbixController.createNewHost);

module.exports = routes;
