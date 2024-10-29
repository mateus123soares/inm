const GrafanaServices = require('../../service/grafana/CreateDashboardService');
const parseAlerts = require("../../service/grafana/parseAlerts");

module.exports = {
  async createDashboard(req, res) {
    const data = {
      name: req.body.name,
      hostname: req.body.hostname,
      ip: req.body.ip,
      interface: req.body.interface
    };
    const status = await GrafanaServices.createDashboard(data);
    return res.status(status.code).json(status);
  },

  async reciveAlert(req, res) {
    let alarmsList = [];

    req.body.alerts.map(alert => {
      const ipPattern = /destination_ip=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
      const matches = alert.valueString.match(ipPattern);
      let destinationIps = []
      if (matches) {
        destinationIps = matches.map(match => match.split('=')[1]);
      } else {
        console.log('Nenhum IP encontrado.');
      }
      alarmsList.push({"alertname": req.body.commonLabels.alertname,
        "destination_ip": destinationIps[0] });
    })

    const response = await parseAlerts.parseAlerts(alarmsList);

    if (response.code == 200) {
      return res.status(200).json("Realizado a criação de alertas");
    }

    return res.status(503);
  },
};
