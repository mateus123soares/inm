const GrafanaServices = require('../../service/grafana/CreateDashboardService');
const parseAlerts = require('../../service/grafana/parseAlerts');

module.exports = {
  async createDashboard(req, res) {
    const data = {
      name: req.body.name,
      hostname: req.body.hostname,
      ip: req.body.ip,
      interface: req.body.interface,
    };
    const status = await GrafanaServices.createDashboard(data);
    return res.status(status.code).json(status);
  },

  async reciveAlert(req, res) {
    const alarmsList = [];
    console.log(req.body);

    if (req.body.status == 'resolved') {
      return res.status(200);
    }

    req.body.alerts.map((alert) => {
      // eslint-disable-next-line max-len
      const ipDestinationPattern = /destination_ip=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
      const ipSourcePattern = /source_ip=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;

      let matches = [];
      switch (req.body.commonLabels.alertname) {
        case 'Total TCP/UDP Destination Requests':
          matches = alert.valueString.match(ipDestinationPattern);
          break;
        case 'Total TCP/UDP Source Requests':
          matches = alert.valueString.match(ipSourcePattern);
          break;
        case 'Total TCP/UDP Port Source Requests':
          matches = alert.valueString.match(ipSourcePattern);
          break;
        case 'Total TCP/UDP Port Destination Requests':
          matches = alert.valueString.match(ipSourcePattern);
          break;
        default:
          console.log('Erro ao localizar o tipo de alerta');
          return res.status(503);
      }

      let destinationIps = [];
      if (matches) {
        destinationIps = matches.map((match) => match.split('=')[1]);
      } else {
        console.log('Nenhum IP encontrado.');
      }
      alarmsList.push({
        alertname: req.body.commonLabels.alertname,
        destination_ip: destinationIps[0],
      });
    });

    const response = await parseAlerts.parseAlerts(alarmsList);

    if (response.code == 200) {
      return res.status(200).json('Realizado a criação de alertas');
    }

    return res.status(503);
  },
};
