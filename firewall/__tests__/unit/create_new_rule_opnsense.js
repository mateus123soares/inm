const { faker } = require('@faker-js/faker');
const firewall = require('../../src/api/service/grafana/parseAlerts');


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
