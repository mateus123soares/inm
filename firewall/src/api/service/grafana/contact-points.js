require('dotenv').config();
const axios = require('axios');
const instanceDashboard = require('./InstanceFirewallService');

const {
  grafanaHost, grafanaUser, grafanaPassword, apiHost, apiPort,
} = require('../../../config/credentials');
const { getAlertSucess, dashboardCreateFail, getAlertFail } = require('../../../constants/messages');

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
      filterWebhook(responseGrafana.data);
    } catch (error) {
      logger.error(getAlertFail, { label: 'alert-service' });
    }
  },
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
    const dashboardTemplate = instanceDashboard.instanceFirewallDashboard();
    // create a buffer
    const buff = Buffer.from(`${grafanaUser}:${grafanaPassword}`, 'utf-8');

    // decode buffer as Base64
    const base64 = buff.toString('base64');

    const options = {
      method: 'POST',
      url: `${grafanaHost}/api/dashboards/db`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64}`,
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

function filterWebhook(response) {
  const filterName = response.filter((item) => item.name == 'grafana-inm');
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
      name: 'grafana-inm1',
      type: 'webhook',
      settings: {
        httpMethod: 'POST',
        url: `${apiHost}:${apiPort}`,
      },
      disableResolveMessage: false,
    },
  };
  try {
    const responseGrafana = await axios.request(options);
  } catch (error) {
    logger.error(getAlertFail, { label: 'alert-service' });
    console.log(error);
  }
}
