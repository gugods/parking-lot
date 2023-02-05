import { inputObjectType, enumType, objectType } from 'nexus';
import { SLOT_STATUS, ERROR_CODE, CAR_SIZE } from 'src/config';
import * as types from 'graphql/types';

export const SlotStatusType = enumType({
  name: 'SlotStatusType',
  members: [SLOT_STATUS.AVAILABLE, SLOT_STATUS.UNAVAILABLE]
});

export const CarSizeType = enumType({
  name: 'CarSizeType',
  members: [CAR_SIZE.S, CAR_SIZE.M, CAR_SIZE.L, CAR_SIZE.X]
});

export const SlotItemType = inputObjectType({
  name: 'SlotItemType',
  definition(t) {
    t.id('id');
    t.field('status', { type: SlotStatusType, default: SLOT_STATUS.AVAILABLE });
  }
});

export const SlotsAttribute = inputObjectType({
  name: 'SlotsAttribute',
  definition(t) {
    t.list.json(CAR_SIZE.S, { type: SlotItemType });
    t.list.json(CAR_SIZE.M, { type: SlotItemType });
    t.list.json(CAR_SIZE.L, { type: SlotItemType });
    t.list.json(CAR_SIZE.X, { type: SlotItemType });
  }
});

export const ParkingType = objectType({
  name: 'ParkingType',
  definition(t) {
    t.id('id');
    t.string('name');
    t.int('floor');
    t.json('slots');
  }
});

export const CreateParkingLotPayload = objectType({
  name: 'CreateParkingLotPayload',
  definition(t) {
    t.field('status', { type: types.StandardRequestStatusPayload });
    t.field('result', { type: types.ParkingType });
    t.field('error', {
      type: objectType({
        name: 'CreateParkingLotError',
        definition(t) {
          t.field('message', {
            type: enumType({
              name: 'CreateParkingLotErrorMessage',
              members: [ERROR_CODE.CREATE_PARKING_LOT_FAIL, ERROR_CODE.DUPLICATE_PARKING_ON_FLOOR]
            })
          });
        }
      })
    });
  }
});

export const GetStatusOfParkingPayload = objectType({
  name: 'GetStatusOfParkingPayload',
  definition(t) {
    t.field('status', { type: types.StandardRequestStatusPayload });
    t.list.field('result', { type: types.ParkingType });
    t.field('error', {
      type: objectType({
        name: 'GetStatusOfParkingError',
        definition(t) {
          t.field('message', {
            type: enumType({
              name: 'GetStatusOfParkingErrorMessage',
              members: [ERROR_CODE.GET_STATUS_OF_PARKING_FAIL]
            })
          });
        }
      })
    });
  }
});
