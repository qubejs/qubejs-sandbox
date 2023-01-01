
const database = require('../../server/database');
database.connect();
const { models, db } = database;

async function create() {
  var opsQueue = [];
  return new Promise(async (resolve) => {
    const dbversion = await models.DbVersion.find({});
    if (dbversion.length === 0) {
      const dbNew = await new models.DbVersion({
        version: '1.0.0'
      }).save();
      console.log('Version created:' + dbNew.version);
    } else {
      console.log('Version found:' + dbversion[0].version);
    }
    Promise.all(opsQueue).then(resolve);
  })
}
create().then(() => {
  db.close();
});
