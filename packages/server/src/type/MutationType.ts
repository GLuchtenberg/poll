import { GraphQLObjectType } from "graphql";

import UserMutations from "../modules/user/mutation";
import PollMutations from "../modules/poll/mutation";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...UserMutations,
    ...PollMutations
  })
});
