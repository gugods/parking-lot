import { asNexusMethod, enumType } from 'nexus';
import { GRAPHQL_STATUS } from 'src/config';
import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJson from 'graphql-type-json';

export * from './ParkingType';
export * from './TicketType';

export const GQLDate = asNexusMethod(GraphQLDateTime, 'datetime');
export const GQLJson = asNexusMethod(GraphQLJson, 'json');

export const StandardRequestStatusPayload = enumType({
  name: 'StandardRequestStatusPayload',
  members: [GRAPHQL_STATUS.SUCCESS, GRAPHQL_STATUS.ERROR]
});
