const database = require('../../server/database');
database.connect();
const { models, db } = database;

const versions = ['1.0.0'];

async function setup() {
  var opsQueue = [];
  return new Promise(async (resolve) => {
    let dbversion = await models.DbVersion.find({});
    if (dbversion && dbversion.length > 0) {
      console.log('Db version:' + dbversion[0].version);
    } else {
      console.log('Db version not set run db:create command to sync the version');

      dbversion = await new Promise((resolve) => {
        new models.DbVersion({
          version: '1.0.0'
        }).save((err, doc) => {
          resolve([doc]);
        });
      });
    }
    var execute = false;
    var versionScriptQue = [];
    versions.forEach(async (version) => {
      if (execute === true) {
        console.log('DB in queue: ' + version);

        opsQueue.push(
          new Promise((resolve, reject) => {
            versionScriptQue.push({
              script: require('./versions/' + version),
              resolve,
              reject
            });
          })
        );
        if (version === versions[versions.length - 1]) {
          opsQueue.push(
            new Promise((resolve, reject) => {
              console.log('DB updating version:' + version);
              dbversion[0].version = version;
              versionScriptQue.push({
                script: () => {
                  return new Promise((resolve) => {
                    dbversion[0].save(resolve);
                  });
                },
                resolve,
                reject
              });
            })
          );
        }
      }
      if (version === dbversion[0].version) {
        execute = true;
      }
    });

    const executeVersionScript = (idx) => {
      versionScriptQue[idx] &&
        versionScriptQue[idx].script(db, models).then((result) => {
          versionScriptQue[idx].resolve();
          idx++;
          executeVersionScript(idx);
        });
    };

    executeVersionScript(0);

    Promise.all(opsQueue).then(resolve);
  });
}
setup().then(() => {
  db.close();
});
