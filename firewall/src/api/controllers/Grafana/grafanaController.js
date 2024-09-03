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

    let regex = /Value:\s\[(.*?)\][\s\S]*?Labels:\n([\s\S]*?)(?=\n\n|$)/g;
    let matches = [];
    let match;
    console.log("Chegou Alerta")

    while ((match = regex.exec(req.body.message)) !== null) {
      let value = match[1];
      let labelsString = match[2];
      let labels = labelsString.split('\n').map(label => {
        const keyValueMatch = label.match(/ - (.*) = (.*)/);
        if (keyValueMatch) {
          const key = keyValueMatch[1].trim();
          const value = keyValueMatch[2].trim();
          return { [key]: value };
        }
        return null;
      }).filter(label => label !== null);
      matches.push({ value, labels });
    }

    if (matches.length === 0) {
      return res.status(500).json({ "error": "Falha ao executar o parser" });
    }
    const response = await parseAlerts.parseAlerts(matches);

    if (response.code == 200) {
      return res.status(200).json("Realizado a criação de alertas");
    }
    return res.status(503);
  },
};
