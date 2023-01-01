const { Error } = require('sq-core/server');

module.exports = {
  ...Error,
  customerror: function () {
    return {
      code: 400,
      message: 'Custom error',
      key: 'CUSTOM_ERROR_KEY'
    };
  },
};
