/* eslint-disable max-len */
const dropRulesIpService = require('../firewall/FirewallDropService');

module.exports = {

  async parseAlerts(matches) {
    matches.forEach(async (element) => {
      switch (element.alertname) {
        case 'Total TCP/UDP Source Requests':
          dropRulesIpService.dropRulesIp({
            rule: {
              description: `${element.alertname}: ${element.ip}`,
              action: 'block',
              direction: 'in',
              source_net: `${element.ip}`,
              destination_net: 'any',
              protocol: 'any',
              interface: 'lan,wan',
              log: '1',
            },
          });
          break;
        case 'Total TCP/UDP Destination Requests':
          dropRulesIpService.dropRulesIp({
            rule: {
              description: `${element.alertname}: ${element.ip}`,
              action: 'block',
              direction: 'in',
              source_net: `${element.ip}`,
              destination_net: 'any',
              protocol: 'any',
              interface: 'lan,wan',
              log: '1',
            },
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
