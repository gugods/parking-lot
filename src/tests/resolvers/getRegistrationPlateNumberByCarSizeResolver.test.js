import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';
import { getRegistrationPlateNumberByCarSize } from 'resolvers';

describe('getRegistrationPlateNumberByCarSize', () => {
  describe('success case', () => {
    it('successfully when information is correct.', async (done) => {
      try {
        const args = {};

        const plateNumberByCarSize = [
          {
            plateNumber: 'AB-9999',
            carSize: 'S',
            total: 1
          }
        ];

        const models = { Ticket: { aggregate: () => plateNumberByCarSize } };

        const results = await getRegistrationPlateNumberByCarSize(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.SUCCESS);
        expect(results.result).toBeDefined();
        expect(results.result).toEqual(plateNumberByCarSize);
        expect(results.error).toBeUndefined();

        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('fail case', () => {
    it('fail when get registration plate number car size fail', async (done) => {
      try {
        const args = {};

        const models = { Ticket: { aggregate: () => null } };

        const results = await getRegistrationPlateNumberByCarSize(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.GET_REGISTRATION_PLATE_NUMBER_BY_CAR_FAIL);

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
