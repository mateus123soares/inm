/* eslint-disable max-len */
const dropRulesIpService = require('../firewall/FirewallDropService');

module.exports = {

  async parseAlerts(matches) {
    matches.forEach(async (element) => {
      switch (element.alertname) {
        case 'Total TCP/UDP Destination Requests':
          dropRulesIpService.dropRulesIp({
            rule: {
              description: `${element.alertname}: ${element.destination_ip}`,
              action: 'block',
              direction: 'out',
              source_net: 'any',
              destination_net: `${element.destination_ip}`,
              protocol: 'TCP',
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
