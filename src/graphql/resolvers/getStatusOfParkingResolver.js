import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';

export const getStatusOfParking = async (parent, args, { models }) => {
  try {
    const parkings = await models.Parking.find();

    if (parkings) {
      return { status: GRAPHQL_STATUS.SUCCESS, result: parkings };
    } else {
      throw new Error(ERROR_CODE.GET_STATUS_OF_PARKING_FAIL);
    }
  } catch (error) {
    return { status: GRAPHQL_STATUS.ERROR, result: null, error: { message: error.message } };
  }
};
