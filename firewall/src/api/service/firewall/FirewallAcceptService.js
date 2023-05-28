const fs = require('fs');
const message = require('../../../constants/messages');
const execCommand = require("./FirewallExecRule")

module.exports = {
  async acceptRulesIp(rule) {
    try {
      const BLOCK_THIS_IP = rule.ip;
      const content = `iptables -A INPUT -s ${BLOCK_THIS_IP} -j ACCEPT\niptables -A OUTPUT -d ${BLOCK_THIS_IP} -j ACCEPT\n`;

      fs.writeFileSync(process.env.PATH_RULES, content, { flag: 'a+' });
      await execCommand.execRule(content)
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
      await execCommand.execRule(content)
    } catch (err) {
      console.error(err);
    }
    return { status: message.sucessRules };
  },
  async listRules(input) {
    const lines = input.split('\n');
    const rules = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Ignorar linhas em branco e cabeçalhos de chain
      if (line === '' || line.startsWith('Chain')) {
        continue;
      }

      // Extrair informações das regras
      const ruleMatch = line.match(/^\s*(\d+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([\w.:]+)\s+([\w.:]+)/);
      if (ruleMatch) {
        const rule = {
          num: ruleMatch[1],
          target: ruleMatch[2],
          prot: ruleMatch[3],
          opt: ruleMatch[4],
          source: ruleMatch[5],
          destination: ruleMatch[6]
        };
        rules.push(rule);
      }
    }
    return rules;
  }
};
