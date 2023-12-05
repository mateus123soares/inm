const FirewallDropResource = require('../../service/firewall/FirewallDropService');
const FirewallAcceptResource = require('../../service/firewall/FirewallAcceptService');
const firewall = require('../../service/firewall/FirewallExecRule')


module.exports = {
  async dropRulesIp(req, res) {
    const data = {
      "rule": {
        "description": req.body.description,
        "source_net": req.body.source_net,
        "protocol": req.body.protocol,
        "destination_net": req.body.destination_net,
      }
    }
    const resp = await FirewallDropResource.dropRulesIp(data);
    return res.status(resp.status).json(resp);
  }
};
