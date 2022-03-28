const axios = require('axios');

const { grafanaHost, grafanaUser, grafanaPassword } = require('../../../config/credentials');
const { getAlertSucess, getAlertFail } = require('../../../constants/messages');

const logger = require('../../../config/winston');

module.exports = {
    async getAlerts() {
        // create a buffer
        const buff = Buffer.from(`${grafanaUser}:${grafanaPassword}`, 'utf-8');

        // decode buffer as Base64
        const base64 = buff.toString('base64');

        const options = {
            method: 'GET',
            url: `${grafanaHost}/api/alertmanager/grafana/api/v2/alerts`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${base64}`,
            },
        };
        try {
            const responseGrafana = await axios.request(options);
            logger.info(getAlertSucess, { label: 'alert-service' });
            return {
                code: 200,
                message: getAlertSucess,
                response: responseGrafana.data,
            };
        } catch (error) {
            logger.error(getAlertFail, { label: 'alert-service' });
            return {
                code: 400,
                message: getAlertFail,
                error: { message: error.message, name: error.name },
            };
        }
    },
};