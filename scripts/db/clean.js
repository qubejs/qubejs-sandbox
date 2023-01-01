const database = require('../../server/database');
database.connect();
const { models, db } = database;

async function clean() {
  return new Promise(async (resolve) => {
    await models.Prospect.deleteMany({});
    await models.Exception.deleteMany({});
    resolve();
  });
}
clean().then(() => {
  db.close();
});
