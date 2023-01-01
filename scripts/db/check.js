const database = require('../../server/database');
database.connect();
const { models, db } = database;

async function clean() {
  return new Promise(async (resolve) => {
    const dbversion = await models.DbVersion.find({});
    if (dbversion && dbversion.length > 0) {
      console.log('Db version:' + dbversion[0].version);
    }
    else {
      console.log('Db version not set run db:create command to sync the version' );
    }

    resolve();
  });
}
clean().then(() => {
  db.close();
});