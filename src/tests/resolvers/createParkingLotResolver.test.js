import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';
import { createParkingLot } from 'resolvers';

describe('createParkingLot', () => {
  describe('success case', () => {
    it('successfully when information is correct.', async (done) => {
      try {
        const args = {
          name: 'First Floor',
          floor: 1,
          slots: {
            S: [
              { id: 'S1-1', status: 'AVAILABLE' },
              { id: 'S1-2', status: 'AVAILABLE' }
            ]
          }
        };

        const models = {
          Parking: { findOne: () => null, create: () => args }
        };

        const results = await createParkingLot(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.SUCCESS);
        expect(results.result).toBeDefined();
        expect(results.result).toEqual(args);
        expect(results.error).toBeUndefined();

        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('fail case', () => {
    it('fail when duplicate parking on floor', async (done) => {
      try {
        const args = {
          name: 'First Floor',
          floor: 1,
          slots: {
            S: [
              { id: 'S1-1', status: 'AVAILABLE' },
              { id: 'S1-2', status: 'AVAILABLE' }
            ]
          }
        };

        const models = {
          Parking: { findOne: () => args, create: () => null }
        };

        const results = await createParkingLot(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.DUPLICATE_PARKING_ON_FLOOR);

        done();
      } catch (error) {
        done(error);
      }
    });
    it('fail when crate parking lot fail', async (done) => {
      try {
        const args = {};

        const models = {
          Parking: { findOne: () => null, create: () => null }
        };

        const results = await createParkingLot(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.CREATE_PARKING_LOT_FAIL);

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
