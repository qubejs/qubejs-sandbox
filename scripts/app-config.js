const packageJson = require('../package.json');
const config = require('../config/environment');

module.exports = {
  appVersion: packageJson.version
};
