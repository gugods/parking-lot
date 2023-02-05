export * from './parkingSchema';

import { mutationType, queryType } from 'nexus';

export const Query = queryType({ definition() {} });
export const Mutation = mutationType({ definition() {} });
