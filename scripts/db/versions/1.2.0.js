const seatsConfig = require('../../../server/config/seats');

module.exports = async function (db, models) {
  return new Promise(async (resolve, reject) => {
    const opsAll = [];
    seatsConfig.forEach(async (seat) => {
      opsAll.push(
        new Promise(async (resolve) => {
          const result = await models.User.find({ firstName: seat.firstName, lastName: seat.lastName });
          if (result.length > 0) {
            result[0].canBookSeat = seat.isBookable;
            result[0].enable = seat.isBookable;
            result[0].save(resolve);
          } else {
            resolve();
          }
        })
      );
    });

    Promise.all(opsAll).then(() => resolve('done'));
  });
};
