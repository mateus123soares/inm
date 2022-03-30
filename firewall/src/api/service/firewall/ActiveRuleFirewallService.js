const logger = require('../../../config/winston');
const FirewallAcceptService = require('./FirewallAcceptService')
const FirewallDropService = require('./FirewallDropService')

async function activeRuleFirewall(rules) {
    const rule = JSON.parse(rules)

    if (rule.type == "accept") {
        switch (rule.rule) {
            case 'ip':
                FirewallAcceptService.acceptRulesIp({
                    ip: rule.data.ip
                })
                break;
            case 'port':
                FirewallAcceptService.acceptRulesIp({
                    port: rule.data.port,
                })
                break;
            default:
                logger.error("Error to create rule", { label: 'alert-service' });
        }
    }
    else {
        switch (rule.rule) {
            case 'interface':
                FirewallDropService.dropRulesInterface({
                    interface: rule.data.interface,
                    ip: rule.data.ip
                })
                break;
            case 'range':
                FirewallDropService.dropRulesRangePort({
                    ip: rule.data.ip,
                    port: rule.data.port
                })
                break;
            case 'port':
                FirewallDropService.dropRulesPort({
                    port: rule.data.port
                })
                break;
            case 'ip':
                FirewallDropService.dropRulesIp({
                    ip: rule.data.ip
                })
                break;
            case 'mac':
                FirewallDropService.dropRulesMac({
                    mac: rule.data.mac
                })
                break;
            default:
                logger.error("Error to create rule", { label: 'alert-service' });
        }
    }

}

module.exports = activeRuleFirewall