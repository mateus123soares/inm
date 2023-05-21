const messages = require('../../../constants/messages');
const contact = require('../../service/grafana/contact-points')
const firewall = require('../../service/firewall/FirewallDropService')
module.exports = {
  async index(req, res) {
    res.json("ok")
  },
};
//valueString: `[ var='B0' metric='{network_transport="udp", source_ip="192.168.0.1"}' labels={network_transport=udp, source_ip=192.168.0.1} value=156 ]`