import { ERROR_CODE, GRAPHQL_STATUS } from 'src/config';
import { leaveTheSlot } from 'resolvers';

describe('leaveTheSlot', () => {
  describe('success case', () => {
    it('successfully when information is correct.', async (done) => {
      try {
        const args = { ticketId: '1' };

        const ticket = {
          plateNumber: 'AB-9999',
          carSize: 'S',
          slotId: 'S1',
          parkingId: 1,
          parkingFloor: 1,
          parkedAt: new Date()
        };
        const models = {
          Parking: { updateOne: () => null },
          Ticket: { findOne: () => ticket, findOneAndUpdate: () => ticket }
        };

        const results = await leaveTheSlot(null, args, { models });

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
    it('fail when ticket not found', async (done) => {
      try {
        const args = { ticketId: '1' };

        const models = {
          Parking: { updateOne: () => null },
          Ticket: { findOne: () => null, findOneAndUpdate: () => null }
        };

        const results = await leaveTheSlot(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.TICKET_NOT_FOUND);

        done();
      } catch (error) {
        done(error);
      }
    });

    it('fail when leave the slot fail', async (done) => {
      try {
        const args = { ticketId: '1' };

        const ticket = {
          plateNumber: 'AB-9999',
          carSize: 'S',
          slotId: 'S1',
          parkingId: 1,
          parkingFloor: 1,
          parkedAt: new Date()
        };

        const models = {
          Parking: { updateOne: () => null },
          Ticket: { findOne: () => ticket, findOneAndUpdate: () => null }
        };

        const results = await leaveTheSlot(null, args, { models });

        expect(results.status).toBe(GRAPHQL_STATUS.ERROR);
        expect(results.result).toBeNull();
        expect(results.error.message).toBe(ERROR_CODE.LEAVE_THE_SLOT_FAIL);

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
