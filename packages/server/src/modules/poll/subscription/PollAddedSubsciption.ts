import { GraphQLObjectType } from "graphql";
import { offsetToCursor } from "graphql-relay";

import { PollConnection } from "../PollType";
import pubSub, { EVENTS } from "../../../pubSub";

const PollAddedPayloadType = new GraphQLObjectType({
  name: "PollAddedPayload",
  fields: () => ({
    pollEdge: {
      type: PollConnection.edgeType,
      resolve: ({ poll }) => ({
        cursor: offsetToCursor(poll.id),
        node: poll
      })
    }
  })
});

const pollAddedSubscription = {
  type: PollAddedPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.POLL.ADDED)
};

export default pollAddedSubscription;
