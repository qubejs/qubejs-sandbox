var fs = require('fs');
require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const { chai, fakeDb, mocks, utils, logger, moment } = require('sq-core/tests/setup');

logger.off();

const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}

const setup = {
  delay,
  logger,
  chai,
  fakeDb,
  moment,
  mocks,
  utils,
  tearUp: async function () {

  },
  tearDown: async function () {

  },
  closeServer: () => {

  }
}

module.exports = setup;