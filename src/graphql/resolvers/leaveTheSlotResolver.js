import { ERROR_CODE, GRAPHQL_STATUS, SLOT_STATUS } from 'src/config';

export const leaveTheSlot = async (parent, args, { models }) => {
  try {
    const { ticketId } = args;

    const ticket = await models.Ticket.findOne({ id: ticketId, exitedAt: { $eq: null } });

    if (!ticket) {
      throw new Error(ERROR_CODE.TICKET_NOT_FOUND);
    }

    const { parkingId, carSize, slotId } = ticket;

    await models.Parking.updateOne(
      {
        id: parkingId,
        [`slots.${carSize}.id`]: slotId
      },
      {
        $set: {
          [`slots.${carSize}.$.status`]: SLOT_STATUS.AVAILABLE
        }
      }
    );

    const updatedTicket = await models.Ticket.findOneAndUpdate(
      { id: ticketId },
      {
        $set: { exitedAt: new Date() }
      }
    );

    if (updatedTicket) {
      return { status: GRAPHQL_STATUS.SUCCESS, result: updatedTicket };
    } else {
      throw new Error(ERROR_CODE.LEAVE_THE_SLOT_FAIL);
    }
  } catch (error) {
    return { status: GRAPHQL_STATUS.ERROR, result: null, error: { message: error.message } };
  }
};
