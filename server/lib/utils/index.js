const api = require('./api');
const appConfig = require('../../../config/environment');
const {
  utils: { UrlGenerator }
} = require('sq-core/server');
module.exports = {
  api,
  url: new UrlGenerator({
    server: appConfig.server
  })
};
