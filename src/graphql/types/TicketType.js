import { objectType, enumType } from 'nexus';
import * as types from 'graphql/types';
import { ERROR_CODE } from 'src/config';

export const TicketType = objectType({
  name: 'TicketType',
  definition(t) {
    t.id('id');
    t.string('plateNumber');
    t.field('carSize', { type: types.CarSizeType });
    t.id('slotId');
    t.id('parkingId');
    t.int('parkingFloor');
    t.datetime('parkedAt');
    t.datetime('exitedAt');
  }
});

export const PlateNumberByCarType = objectType({
  name: 'PlateNumberByCarType',
  definition(t) {
    t.string('plateNumber');
    t.field('carSize', { type: types.CarSizeType });
    t.int('total');
  }
});

export const ParkTheCarPayload = objectType({
  name: 'ParkTheCarPayload',
  definition(t) {
    t.field('status', { type: types.StandardRequestStatusPayload });
    t.field('result', { type: types.TicketType });
    t.field('error', {
      type: objectType({
        name: 'ParkTheCarError',
        definition(t) {
          t.field('message', {
            type: enumType({
              name: 'ParkTheCarErrorMessage',
              members: [ERROR_CODE.PARK_THE_CAR_FAIL, ERROR_CODE.PARKING_NOT_AVAILABLE, ERROR_CODE.DUPLICATE_PLATE_NUMBER]
            })
          });
        }
      })
    });
  }
});

export const LeaveTheSlotPayload = objectType({
  name: 'LeaveTheSlotPayload',
  definition(t) {
    t.field('status', { type: types.StandardRequestStatusPayload });
    t.field('result', { type: types.TicketType });
    t.field('error', {
      type: objectType({
        name: 'LeaveTheSlotError',
        definition(t) {
          t.field('message', {
            type: enumType({
              name: 'LeaveTheSlotErrorMessage',
              members: [ERROR_CODE.LEAVE_THE_SLOT_FAIL, ERROR_CODE.TICKET_NOT_FOUND]
            })
          });
        }
      })
    });
  }
});

export const GetRegistrationPlateNumberByCarSizePayload = objectType({
  name: 'GetRegistrationPlateNumberByCarSizePayload',
  definition(t) {
    t.field('status', { type: types.StandardRequestStatusPayload });
    t.list.field('result', { type: types.PlateNumberByCarType });
    t.field('error', {
      type: objectType({
        name: 'GetRegistrationPlateNumberByCarSizeError',
        definition(t) {
          t.field('message', {
            type: enumType({
              name: 'GetRegistrationPlateNumberByCarSizeErrorMessage',
              members: [ERROR_CODE.GET_REGISTRATION_PLATE_NUMBER_BY_CAR_FAIL]
            })
          });
        }
      })
    });
  }
});

export const GetRegistrationAllocatedSlotByCarSizeParkingPayload = objectType({
  name: 'GetRegistrationAllocatedSlotByCarSizeParkingPayload',
  definition(t) {
    t.field('status', { type: types.StandardRequestStatusPayload });
    t.list.field('result', { type: types.TicketType });
    t.field('error', {
      type: objectType({
        name: 'GetRegistrationAllocatedSlotByCarSizeParkingError',
        definition(t) {
          t.field('message', {
            type: enumType({
              name: 'GetRegistrationAllocatedSlotByCarSizeParkingErrorMessage',
              members: [ERROR_CODE.GET_REGISTRATION_ALLOCATED_SLOT_BY_CAR_FAIL]
            })
          });
        }
      })
    });
  }
});
