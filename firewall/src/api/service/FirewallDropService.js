const fs = require('fs');
const message = require('../../constants/messages');

module.exports = {

  async dropRulesIp(rule) {
    try {
      const BLOCK_THIS_IP = rule.ip;
      const content = `iptables -A INPUT -s "${BLOCK_THIS_IP}" -j DROP\n`;

      fs.writeFileSync(process.env.PATH_RULES, content, { flag: 'a+' });
    } catch (err) {
      console.error(err);
    }
    return { status: message.sucessRules };
  },

  async dropRulesPort(rule) {
    try {
      const BLOCK_THIS_IP = rule.port;
      const content = `iptables -A OUTPUT -p tcp --dport ${BLOCK_THIS_IP} -j DROP\n`;

      fs.writeFileSync(process.env.PATH_RULES, content, { flag: 'a+' });
    } catch (err) {
      console.error(err);
    }
    return { status: message.sucessRules };
  },

  async dropRulesRangePort(rule) {
    try {
      const BLOCK_THIS_IP = rule.ip;
      const BLOCK_THIS_PORT = rule.port;
      const content = `iptables -A OUTPUT -p tcp -d ${BLOCK_THIS_IP} --dport ${BLOCK_THIS_PORT} -j DROP\n`;

      fs.writeFileSync(process.env.PATH_RULES, content, { flag: 'a+' });
    } catch (err) {
      console.error(err);
    }
    return { status: message.sucessRules };
  },

  async dropRulesMac(rule) {
    try {
      const BLOCK_THIS_MAC = rule.mac;
      const content = `iptables -A INPUT -m mac --mac-source ${BLOCK_THIS_MAC} -j DROP\n`;

      fs.writeFileSync(process.env.PATH_RULES, content, { flag: 'a+' });
    } catch (err) {
      console.error(err);
    }
    return { status: message.sucessRules };
  },

  async dropRulesInterface(rule) {
    try {
      const BLOCK_THIS_INTERFACE = rule.interface;
      const BLOCK_THIS_IP = rule.ip;
      const content = `iptables -A INPUT -i ${BLOCK_THIS_INTERFACE} -s ${BLOCK_THIS_IP} -j DROP\n`;

      fs.writeFileSync(process.env.PATH_RULES, content, { flag: 'a+' });
    } catch (err) {
      console.error(err);
    }
    return { status: message.sucessRules };
  },

};