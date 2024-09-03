const fs = require('fs');
const axios = require('axios');
const https = require('https');
const message = require('../../../constants/messages');

module.exports = {

  async dropRulesIp(rule) {
    console.log(rule);
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const options = {
      method: 'POST',
      url: 'https://192.168.1.1/api/firewall/filter/addRule',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic SWNqd3ZWMFNLbDI1aFM1MDkxeTV4QUk4eGcxeXNPSExzTWRhUjR6V2l4MHdEUDR0QUdyTkp3aC9qNUFZNE5rRE8zQmhZU0pCbEhaRVBRODk6ckpqNlN6MkZqZUorYXpvNjFYcENUK04yc0hZdWVpOTU3QjhONWx0OVl0RjR6NXpEYStQUjkzdVp0ZFN2bzN1MFFVUndBaUo5U21MejFIbTE=',
      },
      data: rule,
      httpsAgent: agent,
    };

    try {
      const response = await axios.request(options);
      return ({
        status: response.status,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
