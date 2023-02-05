import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';
import { parkTheCar } from 'resolvers';

describe('parkTheCar', () => {
  describe('success case', () => {
    it('successfully when information is correct.', async (done) => {
      try {
        const args = { plateNumber: 'AB-9999', floor: 1, carSize: 'S' };
        const parking = [
          {
            id: 1,
            name: 'First Floor',
            floor: 1,
            slots: [
              { id: 'S1-1', status: 'AVAILABLE' },
              { id: 'S1-2', status: 'AVAILABLE' }
            ]
          }
        ];
        const ticket = {
          plateNumber: args.plateNumber,
          carSize: args.carSize,
          slotId: 'S1',
          parkingId: 1,
          parkingFloor: args.floor,
          parkedAt: new Date()
        };
        const models = {
          Parking: { updateOne: () => null, aggregate: () => parking },
          Ticket: { findOne: () => null, create: () => ticket }
        };

        const results = await parkTheCar(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.SUCCESS);
        expect(results.result).toBeDefined();
        expect(results.result).toEqual(ticket);
        expect(results.error).toBeUndefined();

        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('fail case', () => {
    it('fail when duplicate plate number', async (done) => {
      try {
        const args = { plateNumber: 'AB-9999', floor: 1, carSize: 'S' };
        const ticket = {
          plateNumber: args.plateNumber,
          carSize: args.carSize,
          slotId: 'S1',
          parkingId: 1,
          parkingFloor: args.floor,
          parkedAt: new Date()
        };
        const models = {
          Parking: { updateOne: () => null, aggregate: () => null },
          Ticket: { findOne: () => ticket, create: () => null }
        };

        const results = await parkTheCar(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.DUPLICATE_PLATE_NUMBER);

        done();
      } catch (error) {
        done(error);
      }
    });
    it('fail when parking not available', async (done) => {
      try {
        const args = { plateNumber: 'AB-9999', floor: 1, carSize: 'S' };
        const models = {
          Parking: { updateOne: () => null, aggregate: () => [] },
          Ticket: { findOne: () => null, create: () => null }
        };

        const results = await parkTheCar(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.PARKING_NOT_AVAILABLE);

        done();
      } catch (error) {
        done(error);
      }
    });

    it('fail when parking the car fail', async (done) => {
      try {
        const args = { plateNumber: 'AB-9999', floor: 1, carSize: 'S' };
        const parking = [
          {
            id: 1,
            name: 'First Floor',
            floor: 1,
            slots: [
              { id: 'S1-1', status: 'AVAILABLE' },
              { id: 'S1-2', status: 'AVAILABLE' }
            ]
          }
        ];
        const models = {
          Parking: { updateOne: () => null, aggregate: () => parking },
          Ticket: { findOne: () => null, create: () => null }
        };

        const results = await parkTheCar(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.PARK_THE_CAR_FAIL);

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
