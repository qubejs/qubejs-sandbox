const database = require('../../server/database');
database.connect();
const { models, db } = database;


async function setup() {
  var opsQueue = [];
  return new Promise(async (resolve) => {
    const users = await models.User.find({});
    users.forEach((user) => {
      console.log('User:' + user._id);
    });
    Promise.all(opsQueue).then(resolve);
  })
}
setup().then(() => {
  db.close();
});