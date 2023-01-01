const database = require('../../server/database');
database.connect();
const { models, db } = database;

const commands = [];

async function setup() {
  var opsQueue = [];
  return new Promise(async (resolve) => {
    var execute = true;
    var versionScriptQue = [];
    commands.forEach(async (version) => {
      if (execute === true) {
        console.log('Sync in queue: ' + version);

        opsQueue.push(
          new Promise((resolve, reject) => {
            versionScriptQue.push({
              script: require('./sync/' + version),
              resolve,
              reject
            });
          })
        );
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
