import { mongodbParkingLot } from 'models';
import migrateParking from './migrateParking';

module.exports = {
  migrate: async function (modelName) {
    if (modelName.toLowerCase() === 'parking') {
      await migrateParking();
    }
    await mongodbParkingLot.close();
  }
};
require('make-runnable/custom')({
  printOutputFrame: false
});
