const _ = require('lodash');
const { utils } = require('sq-core/server');
const { chai, app, tearUp, tearDown, closeServer } = require('../../testapi.setup');
const { expect } = chai;

describe('API:Test', () => {
  var cookieToken = '',
    userId;

  before(async () => {
    await tearUp();
  });

  after(async () => {
    await tearDown();
    closeServer();
  });

  describe('Test 404', () => {
    let response;
    before(async () => {
      response = await chai.request(app).post('/api/v1/test/book').send({
        date: utils.datetime.new().toStringDefault()
      });
    });
    it('should return status 404', async () => {
      expect(response.status).to.equal(404);
    });
  });
});
