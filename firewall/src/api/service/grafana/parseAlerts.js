/* eslint-disable max-len */
const alertsTCP = require('./AlertsTCP');
const alertsDNS = require('./AlertsDNS');
const dropRulesIpService = require('../firewall/FirewallDropService');

module.exports = {

  async parseAlerts(matches) {
    console.log("parserAlerts")
    console.log(matches)

    matches.forEach(async (element) => {
      switch (element.labels[0].alertname) {
        case 'Source DNS Queries':
          await alertsDNS.filtrarNovosItens((await alertsDNS.parseAlerts(element.value)).results);
          break;
        case 'Destiny Connections TCPUDP':
          console.log("Destiny Connections TCPUDP")
          const response = await alertsTCP.filtrarNovosItens((await alertsTCP.parseAlerts(element.value)).results);
          response.response.forEach(async (element) => {
            console.log("Chegou Alerta");
            console.log(element);
            dropRulesIpService.dropRulesIp({
                "rule": {
                    "description": "Regra Gerada automaticamente pela API",
                    "action": "block",
                    "direction": "out",
                    "source_net": "any",
                    "destination_net": `${element.destination_ip}`,
                    "protocol": `${element.network_transport.toUpperCase()}`,
                    "interface":"lan,wan",
                    "log": "1",
                }
            })
          });
          break;
        default:
          console.log('Erro to parse');
      }
    });
    return {
      code: 200,
    };
  },
};