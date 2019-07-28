import { graphql } from "graphql";

import PollModel from "../../PollModel";
import { schema } from "../../../../schema";
import {
  getContext,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose
} from "../../../../../test/helper";

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it("should create a new poll when parameters are valid", async () => {
  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $email: String!
      $password: String!
    ) {
      UserRegisterWithEmail(input: {
        name: $name
        email: $email
        password: $password
      }) {
        token
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    name: "Test",
    description: "lalalalala"
  };

  await graphql(schema, query, rootValue, context, variables);

  const poll = await PollModel.findOne({
    name: variables.name
  });

  expect(poll).not.toBe(null);
});
