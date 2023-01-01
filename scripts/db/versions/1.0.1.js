const seatsConfig = require('../../../server/config/seats');

module.exports = async function (db, models) {
  return new Promise(async (resolve, reject) => {
    const opsAll = [];
    Promise.all(opsAll).then(() => resolve('done'));
  });
};
