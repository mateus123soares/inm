const FirewallDropResource = require('../../service/FirewallDropService');
const FirewallAcceptResource = require('../../service/FirewallAcceptService');

module.exports = {
  async dropRulesIp(req, res) {
    const data = {
      ip: req.body.ip,
    };
    const status = await FirewallDropResource.dropRulesIp(data);
    return res.status(200).json(status);
  },

  async dropRulesPort(req, res) {
    const data = {
      port: req.body.port,
    };
    const status = await FirewallDropResource.dropRulesPort(data);
    return res.status(200).json(status);
  },

  async dropRulesRangePort(req, res) {
    const data = {
      ip: req.body.ip,
      port: req.body.port,
    };
    const status = await FirewallDropResource.dropRulesRangePort(data);
    return res.status(200).json(status);
  },

  async dropRulesMac(req, res) {
    const data = {
      mac: req.body.mac,
    };
    const status = await FirewallDropResource.dropRulesMac(data);
    return res.status(200).json(status);
  },

  async dropRulesInterface(req, res) {
    const data = {
      interface: req.body.interface,
      ip: req.body.ip,
    };
    const status = await FirewallDropResource.dropRulesInterface(data);
    return res.status(200).json(status);
  },

  async acceptRulesIp(req, res) {
    const data = {
      ip: req.body.ip,
    };
    const status = await FirewallAcceptResource.acceptRulesIp(data);
    return res.status(200).json(status);
  },

  async acceptRulesPort(req, res) {
    const data = {
      port: req.body.port,
    };
    const status = await FirewallAcceptResource.acceptRulesPort(data);
    return res.status(200).json(status);
  },
};
