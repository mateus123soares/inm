const ZabbixHostResource = require("../../service/zabbix/HostService")
const ZabbixAutenticResource = require("../../service/zabbix/AutenticService")

module.exports = {
    async getApiToken(req, res) {
        const status = await ZabbixAutenticResource.getApiToken();
        return res.status(status.code).json(status);
    },
    async createNewHost(req, res) {
        const data = {
            ip: req.body.ip,
            hostname: req.body.hostname
        };
        const status = await ZabbixHostResource.createNewHost(data);
        return res.status(status.code).json(status);
    },
};
