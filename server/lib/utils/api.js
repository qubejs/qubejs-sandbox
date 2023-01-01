const {utils} = require('sq-core/server');
const api = {
  mgr: new utils.ApiManager(),
  ApiManager: utils.ApiManager
};

module.exports = api;
