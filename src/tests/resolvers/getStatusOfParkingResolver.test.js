import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';
import { getStatusOfParking } from 'resolvers';

describe('getStatusOfParking', () => {
  describe('success case', () => {
    it('successfully when information is correct.', async (done) => {
      try {
        const args = {};

        const parking = [
          {
            name: 'First Floor',
            floor: 1,
            slots: {
              S: [
                { id: 'S1-1', status: 'AVAILABLE' },
                { id: 'S1-2', status: 'AVAILABLE' }
              ]
            }
          }
        ];

        const models = { Parking: { find: () => parking } };

        const results = await getStatusOfParking(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.SUCCESS);
        expect(results.result).toBeDefined();
        expect(results.result).toEqual(parking);
        expect(results.error).toBeUndefined();

        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('fail case', () => {
    it('fail when get status of parking fail', async (done) => {
      try {
        const args = {};

        const models = { Parking: { find: () => null } };

        const results = await getStatusOfParking(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.GET_STATUS_OF_PARKING_FAIL);

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
