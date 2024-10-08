const logger = require('../../../config/winston');
const axios = require('axios');

const autenticApiZabbix = require('./AutenticService');

const {
  hostCreateFail, hostCreateSucess, tokenCreateFail, dashboardCreateSucess, dashboardExists } = require('../../../constants/messages');
const { zabbixTemplateId, zabbixGroupId, zabbixHost } = require('../../../config/credentials');


module.exports = {
  async getHost(data) {
    const tokenResponse = await autenticApiZabbix.getApiToken();

    if (tokenResponse.code == 400) {
      logger.error(hostCreateFail, { label: 'host-service' });
      return {
        code: 400,
        message: tokenCreateFail,
        error: tokenResponse,
      };
    }

    const options = {
      method: 'GET',
      url: `${zabbixHost}`,
      data: {
        jsonrpc: '2.0',
        method: 'host.get',
        params: {
          output: "extend",
          filter: {
            name: [
              `${data.hostname}`
            ]
          }
        },
        auth: `${tokenResponse.response}`,
        id: 1,
      },
    };

    const responseHostGet = await axios.request(options);
    if (Object.keys(responseHostGet.data.result).length > 0) {
      return {
        code: 200,
        message: responseHostGet.data.result,
        result: true,
      };
    }
    else {
      return {
        code: 200,
        message: "Dashboard não encontrado",
        result: false,
      };
    }
  },
  async createNewHost(host) {
    const tokenResponse = await autenticApiZabbix.getApiToken();

    if (tokenResponse.code == 400) {
      logger.error(hostCreateFail, { label: 'host-service' });
      return {
        code: 400,
        message: tokenCreateFail,
        error: tokenResponse,
      };
    }

    const getHost = await this.getHost(host.hostname)

    if (getHost.result === true) {
      logger.error(hostCreateFail, { label: 'host-service' });
      return {
        code: 400,
        message: dashboardExists,
        error: getHost,
      };
    }

    const options = {
      method: 'POST',
      url: `${zabbixHost}`,
      data: {
        jsonrpc: '2.0',
        method: 'host.create',
        params: {
          host: `${host.hostname}`,
          interfaces: [{
            type: 1, main: 1, useip: 1, ip: `${host.ip}`, dns: '', port: '10050',
          }],
          templates: [{ templateid: `${zabbixTemplateId}` }],
          groups: [{ groupid: `${zabbixGroupId}` }],
          tags: [{ tag: 'Host name', value: `${host.hostname}` }],
        },
        auth: `${tokenResponse.response}`,
        id: 1,
      },
    };

    try {
      const responseHostCreate = await axios.request(options);
      if (!responseHostCreate.data.error) {
        logger.info(hostCreateSucess, { label: 'host-service' });
        return {
          code: 200,
          message: `${hostCreateSucess} and ${dashboardCreateSucess}`,
          response: responseHostCreate.data.result,
        };
      }

      throw responseHostCreate;
    } catch (error) {
      console.log(error)
      logger.error(hostCreateFail, { label: 'host-service' });
      return {
        code: 400,
        message: hostCreateFail,
        error: error.data,
      };
    }
  },
};
