const GrafanaCreateDashboard = require('../../service/grafana/CreateDashboardService');

module.exports = {
  async createDashboard(req, res) {
    const data = {
      name: req.body.name,
      hostname: req.body.hostname,
      ip: req.body.ip,
      interface: req.body.interface
    };
    const status = await GrafanaCreateDashboard.createDashboard(data);
    return res.status(status.code).json(status);
  },
};
