import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';

export const createParkingLot = async (parent, args, { models }) => {
  try {
    const { name, floor, slots } = args;

    const parking = await models.Parking.findOne({ floor });

    if (parking) {
      throw new Error(ERROR_CODE.DUPLICATE_PARKING_ON_FLOOR);
    }

    const createdParking = await models.Parking.create({ name, floor, slots });

    if (createdParking) {
      return { status: GRAPHQL_STATUS.SUCCESS, result: createdParking };
    } else {
      throw new Error(ERROR_CODE.CREATE_PARKING_LOT_FAIL);
    }
  } catch (error) {
    return { status: GRAPHQL_STATUS.ERROR, result: null, error: { message: error.message } };
  }
};
