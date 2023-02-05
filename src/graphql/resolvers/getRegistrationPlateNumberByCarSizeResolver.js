import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';

export const getRegistrationPlateNumberByCarSize = async (parent, args, { models }) => {
  try {
    const { carSize } = args;

    const plateNumberByCarSize = await models.Ticket.aggregate([
      { $match: { carSize } },
      {
        $group: {
          _id: { plateNumber: '$plateNumber', carSize: '$carSize' },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          plateNumber: '$_id.plateNumber',
          carSize: '$_id.carSize',
          total: '$total'
        }
      },
      { $sort: { total: -1, plateNumber: 1 } }
    ]);

    if (plateNumberByCarSize) {
      return { status: GRAPHQL_STATUS.SUCCESS, result: plateNumberByCarSize };
    } else {
      throw new Error(ERROR_CODE.GET_REGISTRATION_PLATE_NUMBER_BY_CAR_FAIL);
    }
  } catch (error) {
    return { status: GRAPHQL_STATUS.ERROR, result: null, error: { message: error.message } };
  }
};
