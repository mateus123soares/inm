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
                        console.log(element)
                        dropRulesIpService.dropRulesIp({
                            "rule": {
                                "description": "Regra Gerada automaticamente pela API",
                                "action": "pass",
                                "direction": "in",
                                "source_net": `${element.destination_ip}`,
                                "destination_net": "any",
                                "protocol": `${element.network_transport.toUpperCase()}`,
                                "interface ": "lan,wan",
                                "log": "1",
                            }
                        })
                    });
                    break;
                default:
                    console.log("Erro to parse");
            }
        });
        return {
            code: 200
        };
    },
};

{

}