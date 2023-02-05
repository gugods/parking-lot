import { mongodbParkingLot } from 'models';

module.exports = {
  run: async function () {
    await mongodbParkingLot.syncIndexes();
    await mongodbParkingLot.close();
  }
};
require('make-runnable');
