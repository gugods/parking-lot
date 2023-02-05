import { arg, extendType, intArg, stringArg, idArg, nonNull } from 'nexus';
import * as types from 'graphql/types';
import * as resolvers from 'resolvers';

export const ParkingQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getStatusOfParking', {
      type: types.GetStatusOfParkingPayload,
      args: {},
      resolve: resolvers.getStatusOfParking
    });
    t.field('getRegistrationPlateNumberByCarSize', {
      type: types.GetRegistrationPlateNumberByCarSizePayload,
      args: {
        carSize: nonNull(arg({ type: types.CarSizeType }))
      },
      resolve: resolvers.getRegistrationPlateNumberByCarSize
    });
    t.field('getRegistrationAllocatedSlotByCarSize', {
      type: types.GetRegistrationAllocatedSlotByCarSizeParkingPayload,
      args: {
        carSize: nonNull(arg({ type: types.CarSizeType }))
      },
      resolve: resolvers.getRegistrationAllocatedSlotByCarSize
    });
  }
});

export const ParkingMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createParkingLot', {
      type: types.CreateParkingLotPayload,
      args: {
        name: nonNull(stringArg()),
        floor: nonNull(intArg()),
        slots: arg({ type: types.SlotsAttribute, default: [] })
      },
      resolve: resolvers.createParkingLot
    });
    t.field('parkTheCar', {
      type: types.ParkTheCarPayload,
      args: {
        plateNumber: nonNull(stringArg()),
        floor: nonNull(intArg()),
        carSize: nonNull(arg({ type: types.CarSizeType }))
      },
      resolve: resolvers.parkTheCar
    });
    t.field('leaveTheSlot', {
      type: types.LeaveTheSlotPayload,
      args: {
        ticketId: nonNull(idArg())
      },
      resolve: resolvers.leaveTheSlot
    });
  }
});
