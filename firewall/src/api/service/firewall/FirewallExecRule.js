const { exec } = require("child_process");
const { createRuleSucess, createRuleError } = require('../../../constants/messages');
const logger = require('../../../config/winston');

module.exports = {

    execRule(content) {
        exec(`ssh ${process.env.FIREWALL_USER}@${process.env.FIREWALL_HOST} 'sudo ${content}'`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                logger.info(createRuleError, { label: 'dashboard-service' });
                return {
                    code: 500,
                    message: createRuleError,
                    response: error.message,
                };
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        })

        exec(`ssh ${process.env.FIREWALL_USER}@${process.env.FIREWALL_HOST} 'sudo /sbin/iptables-save'`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                logger.info(createRuleError, { label: 'dashboard-service' });
                return {
                    code: 500,
                    message: createRuleError,
                    response: error.message,
                };
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            console.log("Save iptables")
        })
        logger.info(createRuleSucess, { label: 'dashboard-service' });
        return {
            code: 200,
            message: createRuleSucess
        };
    }
}