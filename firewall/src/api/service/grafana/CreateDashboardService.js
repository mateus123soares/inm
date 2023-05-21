const axios = require('axios');
const { dashboardCreateSucess, dashboardCreateFail, dashboardExists } = require('../../../constants/messages');
const { grafanaHost, grafanaUser, grafanaPassword } = require('../../../config/credentials');
const instanceDashboard = require('./InstanceDashboardService');
const logger = require('../../../config/winston');
const zabbixService = require('../zabbix/HostService')

module.exports = {
  async createDashboard(data) {
    /*
    const getHost = await zabbixService.getHost({ "hostname": `${data.hostname}` })

    if (getHost.result == true) {
      logger.error(dashboardExists, { label: 'dashboard-service' });
      return {
        code: 400,
        message: dashboardExists,
      };
    }
    */
    const dashboardTemplate = instanceDashboard.instanceDashboard(`Dashboard-${data.hostname}`, data.hostname, data.ip, data.interface);
    // create a buffer
    const buff = Buffer.from(`${grafanaUser}:${grafanaPassword}`, 'utf-8');

    // decode buffer as Base64
    const base64 = buff.toString('base64');

    const options = {
      method: 'POST',
      url: `${grafanaHost}/api/dashboards/db`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64}`,
      },
      data: dashboardTemplate,
    };
    try {
      const responseGrafana = await axios.request(options);
      logger.info(dashboardCreateSucess, { label: 'dashboard-service' });
      return {
        code: 200,
        message: dashboardCreateSucess,
        response: responseGrafana.data.result,
      };
    } catch (error) {
      logger.error(dashboardCreateFail, { label: 'dashboard-service' });
      return {
        code: 400,
        message: dashboardCreateFail,
        error: { message: error.message, name: error.name },
      };
    }
  },
};
