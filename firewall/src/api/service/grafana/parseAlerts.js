const alertsTCP = require("./AlertsTCP");
const alertsDNS = require("./AlertsDNS")
const dropRulesIpService = require("../firewall/FirewallDropService")

module.exports = {

    async parseAlerts(matches) {
        matches.forEach(async function (element) {
            switch (element.labels[0].alertname) {
                case "Source DNS Queries":
                    await alertsDNS.filtrarNovosItens((await alertsDNS.parseAlerts(element.value)).results)
                    break;
                case "Source Connections TCPUDP":
                    const response = await alertsTCP.filtrarNovosItens((await alertsTCP.parseAlerts(element.value)).results)
                    response.response.forEach(async function (element) {
                        dropRulesIpService.dropRulesIp({ "ip": element.source_ip })
                    });
                    break;
                default:
                    console.log("Não é segunda, terça ou quarta.");
            }
        });
        return {
            code: 200
        };
    },
};
