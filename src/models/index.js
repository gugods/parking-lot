import mongoose from 'mongoose';

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: process.env.NODE_ENV !== 'test',
  ssl: false,
  sslValidate: false
};

const mongodbConnection = `mongodb://${process.env.MONGODB_HOST}/parking-lot`;
const mongodbParkingLot = mongoose.createConnection(mongodbConnection, mongodbOptions);

import ParkingModel from './ParkingModel';
import TicketModel from './TicketModel';

const models = {
  Parking: ParkingModel(mongodbParkingLot),
  Ticket: TicketModel(mongodbParkingLot)
};

export { mongodbParkingLot };

export default models;
