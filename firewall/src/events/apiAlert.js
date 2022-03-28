const nodeSchedule = require('node-schedule');
const logger = require('../config/winston');

const { cronJobNotify, cronJobError } = require('../constants/messages');

const alertGrafanaService = require('../api/service/grafana/consultAlertsService');

let ALERT_REQUEST = []

const job = nodeSchedule.scheduleJob(process.env.CRONJOB_RULE, async () => {
    try {

        logger.info(cronJobNotify, { label: 'alert-service' });

        const result = await alertGrafanaService.getAlerts();

        if (ALERT_REQUEST.length == 0) {
            for (let item in result.response) {
                ALERT_REQUEST.push(result.response[item])
            }
        }
        else {
            for (let item in result.response) {
                if (!ALERT_REQUEST.some(e => e.labels.__alert_rule_uid__ == result.response[item].labels.__alert_rule_uid__)) {
                    ALERT_REQUEST.push(result.response[item])
                }
            }
        }

    } catch (error) {
        logger.error(cronJobError, { label: 'alert-service' });
    }
});