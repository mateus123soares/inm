const messages = require('../../../constants/messages');
const contact = require('../../service/grafana/contact-points')
const firewall = require('../../service/firewall/FirewallExecRule')
module.exports = {
  async index(req, res) {
    res.json("ok")
  },
};
//valueString: `[ var='B0' metric='{network_transport="udp", destination_ip="192.168.0.1"}' labels={network_transport=udp, destination_ip=192.168.0.1} value=156 ]`