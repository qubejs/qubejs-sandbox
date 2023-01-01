const constants = require('../constants');
const BaseRepository = require('./AppBaseRepository');

class ExceptionsRepository extends BaseRepository {
  constructor(options) {
    super({
      ...options,
      collection: 'exceptions'
    });
  }

  create({ body, request, response, source = constants.EXCEPTION_SOURCE.WEB_FORM }) {
    return this.insert({
      request,
      body,
      response,
      source,
      status: constants.EXCEPTION_STATUS.NEW
    });
  }
}

module.exports = ExceptionsRepository;
