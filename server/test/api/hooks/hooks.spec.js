const _ = require('lodash');
const { utils } = require('sq-core/server');
const { chai, app, tearUp, tearDown, closeServer } = require('../../testapi.setup');
const { expect } = chai;

describe('API:Hooks', () => {
  before(async () => {
    await tearUp();
  });

  after(async () => {
    await tearDown();
    closeServer();
  });

  describe('/prospect', () => {
    let response;
    before(async () => {
      response = await chai.request(app).post('/api/v1/hooks/prospect').send({
        Agent: 'Test',
        'First Name': 'Test'
      });
    });
    it('should return status 200', async () => {
      expect(response.status).to.equal(200);
    });
  });
});
