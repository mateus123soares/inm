const { faker } = require('@faker-js/faker');
const firewall = require('../../src/api/service/grafana/parseAlerts');
const dropRulesIpService = require('../../src/api/service/firewall/FirewallDropService');

// A rota deve criar uma nova regra no firewall OPNSense
describe('A rota deve criar uma nova regra (IP) no Firewall OPNSense', () => {
  it('Deve bloquear um IP', async () => {
    const response = await firewall.parseAlerts({
      alertname: "Total TCP/UDP Source Requests",
      ip: faker.internet.ipv4()
    });

    expect(response.code).toBe(200);
  });
});

// A rota deve criar uma nova regra no firewall OPNSense
describe('A rota deve criar uma nova regra (Port) no Firewall OPNSense', () => {
  it('Deve bloquear uma Porta', async () => {
    const response = await firewall.parseAlerts({
      alertname: "Total TCP/UDP Port Destination Requests",
      ip: faker.internet.ipv4()
    });

    expect(response.code).toBe(200);
  });
});

// A rota deve criar uma nova regra no firewall OPNSense
describe('A rota deve criar uma nova regra no Firewall OPNSense', () => {
  it('Deve bloquear um IP no OPNSense', async () => {
    const response = await dropRulesIpService.dropRulesIp({
      description: `Teste Automatizado`,
      action: 'block',
      direction: 'in',
      source_net: `faker.internet.ipv4()`,
      destination_net: 'any',
      protocol: 'any',
      interface: 'lan,wan',
      log: '1',
    });

    expect(response.code).toBe(200);
  });
});
