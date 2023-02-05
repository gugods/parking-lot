import express from 'express';
import bodyParser from 'body-parser';
import { createGraphqlMiddleware } from 'express-gql';
import * as allTypes from './graphql';
import { makeSchema } from 'nexus';
import models, { mongodbParkingLot } from './models';

const app = express();

const host = '0.0.0.0';
let port = process.env.LISTEN_PORT;

const graphqlMiddleware = createGraphqlMiddleware({
  context: ({ req, res }) => {
    if (req) {
      return { models, mongodbParkingLot };
    }
  },
  schema: makeSchema({
    types: allTypes
  })
});

app.post('/graphql', bodyParser.json(), [graphqlMiddleware]);
app.listen({ port, host }, () => console.log(`Express-gql Server started, listening on http://0.0.0.0:${port}/graphql`));
