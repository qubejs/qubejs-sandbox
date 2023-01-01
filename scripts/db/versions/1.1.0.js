const seatsConfig = require('../../../server/config/seats');
const usersConfig = require('../../../server/config/users');

module.exports = async function (db, models) {
  return new Promise(async (resolve, reject) => {
    const opsAll = [];
    await models.Seat.deleteMany({});
    await models.User.deleteMany({});
    let userId = 1;
    seatsConfig.forEach(async (seat) => {
      // console.log(`Checking: ${seat.firstName} ${seat.lastName} (${seat.userId}) = ${seats.length}`);
      opsAll.push(
        new Promise((resolve) => {
          new models.Seat(seat).save((err, save) => {
            if (err) {
              console.log(err);
            }
            resolve(save);
          });
        })
      );
      
    });
    usersConfig.forEach(async (user) => {
      opsAll.push(
        new Promise((resolve) => {
          new models.User({ userId: userId++, canBookSeat: true, active: true, ...user }).save((err, save) => {
            if (err) {
              console.log(err);
            }
            resolve(save);
          });
        })
      );
    });

    Promise.all(opsAll).then(() => resolve('done'));
  });
};
