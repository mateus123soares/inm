const fs = require('fs');
const message = require('../../../constants/messages');
const axios = require("axios")
const https = require("https")

module.exports = {

  async dropRulesIp(rule) {
    console.log("oidfaskjfdsdjklfhsdjklfh")
    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    var options = {
      method: 'POST',
      url: 'https://192.168.56.117/api/firewall/filter/addRule',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic TUEvdmZaVEcrYlRjOWJXM1lhSUd0cG9NZzFMU3ZnSmFzcVlEaVg2S0hSa3RnWTRIS284eHAwbkNjTVBxWnR0bmF5cW5ZRGNLd2NqV1p2WEI6NnJXOG42YWJsdkIyOTlXUGUrUFpaTUJ2RnQ0bVJmejRRelRiczdTV0lxaVFoVnhKRktmWENTUVczejR2c0p5ZE1DdkIzTzUxbWZMczhGY0s='
      },
      data: rule,
      httpsAgent: agent
    };

    try {
      const response = await axios.request(options);
      //console.log(response)
      return ({
        status: response.status,
        data: response.data
      })
    }
    catch (error) {
      console.log(error)
    }


  }
}