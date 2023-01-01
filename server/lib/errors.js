const { Error } = require('sq-core/server');

module.exports = {
  ...Error,
  invaliduser: function () {
    return {
      code: 400,
      message: 'Invalid user name',
      key: 'INVALID_USER_NAME'
    };
  },
};
