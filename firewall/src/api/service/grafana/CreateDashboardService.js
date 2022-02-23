const axios = require('axios');
const { dashboardCreateSucess, dashboardCreateFail } = require('../../../constants/messages');
const { grafanaHost, grafanaUser, grafanaPassword } = require('../../../config/credentials');
const instanceDashboard = require('../grafana/InstanceDashboardService')
const logger = require('../../../config/winston')

module.exports = {
    async createDashboard(data) {
        const dashboardTemplate = instanceDashboard.instanceDashboard(`Dashboard-${data.hostname}`, data.hostname);
        //const buff = new Buffer(`${grafanaUser}:${grafanaPassword}`);
        //const base64data = buff.toString('base64');
        const options = {
            method: 'POST',
            url: `${grafanaHost}/api/dashboards/db`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic YWRtaW46YWRtaW4=`
            },
            data: dashboardTemplate
        };
        try {
            const responseGrafana = await axios.request(options);
            logger.info(dashboardCreateSucess, { label: 'dashboard-service' });
            return {
                "code": 200,
                "message": dashboardCreateSucess,
                "response": responseGrafana.data.result
            };
        } catch (error) {
            logger.error(dashboardCreateFail, { label: 'dashboard-service' });
            return {
                "code": 400,
                "message": dashboardCreateFail,
                "error": { "message": error.message, "name": error.name, }
            };
        }
    },
};