const axios = require('axios');
const { tokenCreateSucess, tokenCreateFail } = require('../../../constants/messages');
const { zabbixHost, zabbixUsername, zabbixpassword } = require('../../../constants/zabbix');
const logger = require('../../../config/winston')

module.exports = {
    async getApiToken() {
        const options = {
            method: 'GET',
            url: `${zabbixHost}`,
            data: {
                jsonrpc: '2.0',
                method: 'user.login',
                params: { user: `${zabbixUsername}`, password: `${zabbixpassword}` },
                id: 1,
                auth: null
            }
        };
        try {
            const responseToken = await axios.request(options);
            if (!responseToken.data.error) {
                logger.info(tokenCreateSucess, { label: 'autentic-service' });
                return {
                    "code": 200,
                    "message": tokenCreateSucess,
                    "response": responseToken.data.result
                };
            }
            else {
                throw "error"
            }
        } catch (error) {
            logger.error(tokenCreateFail, { label: 'autentic-service' });
            return {
                "code": 400,
                "message": tokenCreateFail,
                "error": "Invalid credentials or host"
            };
        }
    },
};