const axios = require('axios');

const autenticApiZabbix = require('./AutenticService');

const logger = require('../../../config/winston');
const { hostCreateFail, hostCreateSucess, tokenCreateFail } = require('../../../constants/messages');
const { zabbixTemplateId, zabbixGroupId, zabbixHost } = require('../../../constants/zabbix');

module.exports = {
    async createNewHost(host) {
        const tokenResponse = await autenticApiZabbix.getApiToken();

        if (tokenResponse.code == 400) {
            logger.error(hostCreateFail, { label: 'host-service' });
            return {
                "code": 400,
                "message": tokenCreateFail,
                "error": tokenResponse
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
                    interfaces: [{ type: 1, main: 1, useip: 1, ip: `${host.ip}`, dns: '', port: '10050' }],
                    templates: [{ templateid: `${zabbixTemplateId}` }],
                    groups: [{ groupid: `${zabbixGroupId}` }],
                    tags: [{ tag: 'Host name', value: `${host.hostname}` }]
                },
                auth: `${tokenResponse.response}`,
                id: 1
            }
        };
        try {
            const responseHostCreate = await axios.request(options);
            if (!responseHostCreate.data.error) {
                logger.info(hostCreateSucess, { label: 'host-service' });
                return {
                    "code": 200,
                    "message": hostCreateSucess,
                    "response": responseHostCreate.data.result
                };
            }
            else {
                throw responseHostCreate
            }
        } catch (error) {
            logger.error(hostCreateFail, { label: 'host-service' });
            return {
                "code": 400,
                "message": hostCreateFail,
                "error": error.data
            };
        }
    }
};