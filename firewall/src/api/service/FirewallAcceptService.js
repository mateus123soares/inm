const fs = require('fs');
const message = require('../../constants/messages');

module.exports = {
  async acceptRulesIp(rule) {
    try {
      const BLOCK_THIS_IP = rule.ip;
      const content = `iptables -A INPUT -s ${BLOCK_THIS_IP} -j ACCEPT\niptables -A OUTPUT -d ${BLOCK_THIS_IP} -j ACCEPT\n`;

      fs.writeFileSync(process.env.PATH_RULES, content, { flag: 'a+' });
    } catch (err) {
      console.error(err);
    }
    return { status: message.sucessRules };
  },

  async acceptRulesPort(rule) {
    try {
      const BLOCK_THIS_PORT = rule.port;
      const content = `iptables -I INPUT -p tcp -m tcp --dport ${BLOCK_THIS_PORT} -j ACCEPT`;

      fs.writeFileSync(process.env.PATH_RULES, content, { flag: 'a+' });
    } catch (err) {
      console.error(err);
    }
    return { status: message.sucessRules };
  },
};
