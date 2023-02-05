import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';
import { getRegistrationAllocatedSlotByCarSize } from 'resolvers';

describe('getRegistrationAllocatedSlotByCarSize', () => {
  describe('success case', () => {
    it('successfully when information is correct.', async (done) => {
      try {
        const args = {};

        const ticket = [
          {
            plateNumber: 'AB-9999',
            carSize: 'S',
            slotId: 'S1',
            parkingId: 1,
            parkingFloor: 1,
            parkedAt: new Date()
          }
        ];

        const models = { Ticket: { find: () => ticket } };

        const results = await getRegistrationAllocatedSlotByCarSize(null, args, { models });

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
    it('fail when get registration allocated slot by car size fail', async (done) => {
      try {
        const args = {};

        const models = { Ticket: { find: () => null } };

        const results = await getRegistrationAllocatedSlotByCarSize(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.GET_REGISTRATION_ALLOCATED_SLOT_BY_CAR_FAIL);

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
