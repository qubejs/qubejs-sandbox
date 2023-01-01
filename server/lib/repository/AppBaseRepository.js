const { domain } = require('sq-core/server');
const database = require('../../database');
require('dotenv').config();

class AppBaseRepository extends domain.BaseRepository {
  constructor({
    // db = new DynamoDatabase({
    //   region: process.env.AWS_DEFAULT_REGION,
    //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    // }),
    db = database,
    ...options
  } = {}) {
    super({
      db,
      ...options
    });
  }
}

module.exports = AppBaseRepository;
