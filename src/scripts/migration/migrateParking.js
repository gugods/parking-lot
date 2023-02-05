import models from 'models';
import { mockDataParking } from '../../tests/mocks/parkings';

export default async function migrateParking() {
  console.info('Start Migrate Parking model from data');
  try {
    await models.Parking.insertMany(mockDataParking);

    console.info('Migrate Parking success');
  } catch (error) {
    console.log(error);
  }
}
