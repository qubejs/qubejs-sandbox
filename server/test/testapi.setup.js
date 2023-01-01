var fs = require('fs');
require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const { chai, ...rest } = require('./test.setup');
const { app, server } = require('../start');

const setup = {
  chai,
  ...rest,
  app,
  server,
  setUpUserForLogin: async (username, password, phone, name) => {
    const user = await chai.request(app).post('/api/v1/register').send({
      fullName: name || 'Test User',
      email: username,
      countryCode: 'IN',
      password: password,
      phone: phone || '1234567890'
    });
    await setup.verifyEmail(user.body.data.uid);
   
    var response = await chai.request(app).post('/api/v1/login').send({
      emailphone: username,
      password: password
    });

    return {
      cookieToken: response.body.data.token,
      userId: response.body.data.userInfo.uid
    };
  },
  loginUser: async (username, password) => {
    var response = await chai.request(app).post('/api/v1/login').send({
      emailphone: username,
      password: password
    });

    return {
      cookieToken: response.body.data.token,
      userId: response.body.data.userInfo.uid
    };
  }
};

module.exports = setup; 