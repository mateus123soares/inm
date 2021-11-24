const messages = require('../../../constants/messages');

module.exports = {
  async index(req, res) {
    res.status(200).json(messages.homePage);
  },
};
