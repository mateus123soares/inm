const { faker } = require('@faker-js/faker');
const autentic = require('../../src/api/service/zabbix/AutenticService');
const host = require('../../src/api/service/zabbix/HostService');

// A rota / deve retornar um token de acesso
describe('Autenticação', () => {
  it('Deve receber um token de autenticação', async () => {
    const response = await autentic.getApiToken();

    expect(response.code).toBe(200);
    expect(response.message).toBe('New token created in zabbix successfully');
    expect(typeof response.response).toBe('string');
  });
});

// A rota / deve retornar um token de acesso
describe('Obtem valores de um Host', () => {
  it('Deve Obter Valores de um HOST', async () => {
    const response = await host.getHost({ hostname: 'Zabbix server' });

    expect(response.result).toBe(true);
  });
});

// A rota / deve retornar um token de acesso
describe('Criar Host', () => {
  it('Deve Criar um host', async () => {
    const response = await host.createNewHost({
      name: faker.person.firstName(),
      interface: 'enp2',
      ip: faker.internet.ipv4(),
      hostname: `${faker.person.firstName()}-hp`,
    });

    expect(response.code).toBe(200);
  });
});
