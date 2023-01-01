const mongoose = require('mongoose');
const { utils } = require('sq-core/server');
const config = require('../../config/environment');
const collections = require('./collections');
const Model = require('./model');
require('dotenv').config();

const { logger } = utils;

class Database {
  constructor() {
    this.databaseUrl =
      config.db.connection +
      (config.db.username && config.db.password ? config.db.username + ':' + config.db.password + '@' : '') +
      config.db.host +
      '/' +
      config.db.dbname;
    this.status = 'pending';
  }

  connect() {

    if (['connected', 'connecting'].indexOf(this.getStatus()) > -1) {
      return;
    }
    logger.log('connecting to env:' + config.env);
    const { conn, allModels } = this.connectionFactory();
    this.db = conn;
    this.models = allModels;
    this.collections = collections(allModels, conn);
  }
  getStatus() {
    return this.status;
  }

  connectionFactory() {
    const conn = mongoose.createConnection(process.env.MONGODB_URI || this.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    let allModels = Model(conn);
    this.status = 'connecting';
    conn.on('error', (err) => {
      this.status = 'error';
      logger.log('@db: connection error:' + err.message);
    });
    conn.on('open', () => {
      this.status = 'connected';
      logger.log('@db: connection is connected : ' + config.env);
    });
    conn.on('close', () => {
      this.status = 'closed';
      logger.log('@db: connection is closed : ' + config.env);
    });
    return {
      conn,
      allModels
    };
  }
}

module.exports = new Database();
