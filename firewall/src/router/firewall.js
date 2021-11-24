const { Router } = require('express');

const routes = Router();

const firewallController = require('../api/controllers/Firewall/firewallController.js');

// ROTAS DROP
routes.post('/drop/ip', firewallController.dropRulesIp);
routes.post('/drop/port', firewallController.dropRulesPort);
routes.post('/drop/range', firewallController.dropRulesRangePort);
routes.post('/drop/mac', firewallController.dropRulesMac);
routes.post('/drop/interface', firewallController.dropRulesInterface);

// ROTAS ACCEPT
routes.post('/accept/ip', firewallController.acceptRulesIp);
routes.post('/accept/port', firewallController.acceptRulesPort);

module.exports = routes;
