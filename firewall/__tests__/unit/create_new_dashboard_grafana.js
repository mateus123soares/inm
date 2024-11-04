const { faker } = require('@faker-js/faker');
const dashboard = require('../../src/api/service/grafana/CreateDashboardService');


// A rota deve criar um novo dashboard no Grafana
describe('A rota deve criar um novo host no grafana', () => {
  it('Deve Criar um host', async () => {
    const response = await dashboard.createDashboard({
      name: faker.person.firstName(),
      interface: 'enp2',
      ip: faker.internet.ipv4(),
      hostname: `${faker.person.firstName()}-hp`,
    });

    expect(response.code).toBe(200);
    expect(response.message).toBe('New dashboard created in grafana successfully');
  });
});
