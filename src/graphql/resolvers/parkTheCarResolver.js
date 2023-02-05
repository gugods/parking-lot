import { ERROR_CODE, GRAPHQL_STATUS, SLOT_STATUS } from 'src/config';

export const parkTheCar = async (parent, args, { models }) => {
  try {
    const { plateNumber, floor, carSize } = args;

    const ticket = await models.Ticket.findOne({ plateNumber, exitedAt: { $eq: null } });

    if (ticket) {
      throw new Error(ERROR_CODE.DUPLICATE_PLATE_NUMBER);
    }

    const parking = await findNearestSlotOfParking({ models, floor, carSize });

    if (!parking) {
      throw new Error(ERROR_CODE.PARKING_NOT_AVAILABLE);
    }

    const slotId = parking.slots[0].id;

    await models.Parking.updateOne(
      {
        id: parking.id,
        [`slots.${carSize}.id`]: slotId
      },
      {
        $set: {
          [`slots.${carSize}.$.status`]: SLOT_STATUS.UNAVAILABLE
        }
      }
    );

    const createdTicket = await models.Ticket.create({
      plateNumber,
      carSize,
      slotId: slotId,
      parkingId: parking.id,
      parkingFloor: parking.floor,
      parkedAt: new Date()
    });

    if (createdTicket) {
      return { status: GRAPHQL_STATUS.SUCCESS, result: createdTicket };
    } else {
      throw new Error(ERROR_CODE.PARK_THE_CAR_FAIL);
    }
  } catch (error) {
    return { status: GRAPHQL_STATUS.ERROR, result: null, error: { message: error.message } };
  }
};

const findNearestSlotOfParking = async ({ models, floor, carSize }) => {
  const parkings = await models.Parking.aggregate([
    {
      $project: {
        diff: { $abs: { $subtract: [floor, '$floor'] } },
        floor: '$floor',
        slots: `$slots.${carSize}`,
        name: '$name',
        slots: {
          $filter: {
            input: `$slots.${carSize}`,
            cond: { $eq: [`$$slot.status`, SLOT_STATUS.AVAILABLE] },
            as: 'slot'
          }
        }
      }
    },
    {
      $sort: { diff: 1, floor: 1 }
    }
  ]);

  const slotAvailable = parkings.find((parking) => parking?.slots?.length > 0);

  return slotAvailable;
};
