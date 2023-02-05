import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';

export const getRegistrationAllocatedSlotByCarSize = async (parent, args, { models }) => {
  try {
    const { carSize } = args;

    const tickets = await models.Ticket.find({ carSize, exitedAt: { $eq: null } });

    if (tickets) {
      return { status: GRAPHQL_STATUS.SUCCESS, result: tickets };
    } else {
      throw new Error(ERROR_CODE.GET_REGISTRATION_ALLOCATED_SLOT_BY_CAR_FAIL);
    }
  } catch (error) {
    return { status: GRAPHQL_STATUS.ERROR, result: null, error: { message: error.message } };
  }
};
