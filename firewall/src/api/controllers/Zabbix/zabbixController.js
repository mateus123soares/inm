const ZabbixHostResource = require('../../service/zabbix/HostService');
const ZabbixAutenticResource = require('../../service/zabbix/AutenticService');
const GrafanaCreateDashboardResource = require("../../service/grafana/CreateDashboardService");

module.exports = {
  async getApiToken(req, res) {
    const status = await ZabbixAutenticResource.getApiToken();
    return res.status(status.code).json(status);
  },
  async createNewHost(req, res) {
    const data = {
      name: req.body.name,
      hostname: req.body.hostname,
      ip: req.body.ip,
      interface: req.body.interface
    };

    const status = await ZabbixHostResource.createNewHost(data);
    if (status.code == 200) {
      const statusDashboard = await GrafanaCreateDashboardResource.createDashboard(data);
      if (statusDashboard != 200) {
        return res.status(status.code).json(status);
      }
    }

    return res.status(status.code).json(status);
  },
  async getHost(req, res) {
    const data = {
      hostname: req.body.hostname
    };
    const status = await ZabbixHostResource.getHost(data);
    return res.status(status.code).json(status);
  },
};
