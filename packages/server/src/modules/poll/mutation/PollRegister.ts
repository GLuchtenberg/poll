import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType
} from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import pubSub, { EVENTS } from "../../../pubSub";

import PollModel from "../PollModel";
import PollType from "../PollType";

const AnswerInputType = new GraphQLInputObjectType({
  name: "AnswerInputType",
  fields: () => ({
    text: {
      type: GraphQLString
    }
  })
});

export default mutationWithClientMutationId({
  name: "PollRegistration",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    answers: {
      type: new GraphQLList(AnswerInputType)
    }
  },

  mutateAndGetPayload: async ({ name, description }) => {
    const poll = new PollModel({
      name,
      description
    });

    await poll.save();

    await pubSub.publish(EVENTS.POLL.ADDED, { PollAdded: { poll } });

    return poll;
  },

  outputFields: {
    poll: {
      type: PollType,
      resolve: poll => poll
    },

    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
