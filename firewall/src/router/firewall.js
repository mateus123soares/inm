const { Router } = require('express');

const routes = Router();

const firewallController = require('../api/controllers/Firewall/firewallController.js');

// ROTAS DROP
routes.post('/drop/ip', firewallController.dropRulesIp);

module.exports = routes;
