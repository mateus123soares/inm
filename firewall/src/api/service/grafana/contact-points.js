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
            url: `${grafanaHost}/api/v1/provisioning/contact-points`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${base64}`,
            },
        };
        try {
            const responseGrafana = await axios.request(options);
            filterWebhook(responseGrafana.data)
        } catch (error) {
            logger.error(getAlertFail, { label: 'alert-service' });
        }
    },
};

function filterWebhook(response) {
    const filterName = response.filter(item => item.name == 'grafana-inm')
    if (filterName.length == 0) {
        createWebhook();
    }
}

async function createWebhook() {
    const buff = Buffer.from(`${grafanaUser}:${grafanaPassword}`, 'utf-8');

    // decode buffer as Base64
    const base64 = buff.toString('base64');

    const options = {
        method: 'POST',
        url: `${grafanaHost}/api/v1/provisioning/contact-points`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${base64}`,
        },
        data: {
            "name": "grafana-inm",
            "type": "webhook",
            "settings": {
                "httpMethod": "POST",
                "url": `${API_HOST}:${PORT}`
            },
            "disableResolveMessage": false
        }
    };
    try {
        const responseGrafana = await axios.request(options);
    } catch (error) {
        logger.error(getAlertFail, { label: 'alert-service' });
        console.log(error)
    }
}