const seatsConfig = require('../../../server/config/seats');
const seatingConfig = require('../../../server/config/seating');

module.exports = async function (db, models) {
  return new Promise(async (resolve, reject) => {
    const opsAll = [];
    await models.Seating.deleteMany({});
    seatingConfig.exclusive.forEach(async (exclusiveConfig) => {
      const { seats = [] } = exclusiveConfig;

      seatsConfig.forEach(async (seat) => {
        if (seat.department === exclusiveConfig.department) {
          if (seats.length === 0 || seats.indexOf(seat.seatNumber) > -1) {
            opsAll.push(
              new Promise((resolve) => {
                new models.Seating({
                  department: exclusiveConfig.department,
                  seatId: seat.seatNumber,
                  seatingType: 'exclusive'
                }).save((err, save) => {
                  if (err) {
                    console.log(err);
                  }
                  resolve(save);
                });
              })
            );
          }
        }
      });

    });
    Promise.all(opsAll).then(() => resolve('done'));
  });
};
