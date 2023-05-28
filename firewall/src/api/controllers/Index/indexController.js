const messages = require('../../../constants/messages');
const contact = require('../../service/grafana/contact-points')
const firewall = require('../../service/firewall/FirewallExecRule')
module.exports = {
  async index(req, res) {
    const teste = await firewall.getRule(async (error, result) => {
      if (error) {
        console.error(error); // Aqui você pode lidar com o erro, se ocorrer algum
      } else {
        console.log(result); // Aqui você pode acessar o resultado retornado pela função
      }
    });
    console.log(teste)
    res.json("ok")
  },
};
//valueString: `[ var='B0' metric='{network_transport="udp", source_ip="192.168.0.1"}' labels={network_transport=udp, source_ip=192.168.0.1} value=156 ]`