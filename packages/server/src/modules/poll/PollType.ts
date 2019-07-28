import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList
} from "graphql";
import { globalIdField } from "graphql-relay";

import { connectionDefinitions } from "../../core/connection/CustomConnectionType";
import { registerType, nodeInterface } from "../../interface/NodeInterface";

export const AnswerType = registerType(
  new GraphQLObjectType({
    name: "Answer",
    description: "Answers from a poll",
    fields: () => ({
      id: globalIdField("Answer"),
      _id: {
        type: GraphQLString,
        resolve: answer => answer._id
      },
      text: {
        type: GraphQLString,
        resolve: answer => answer.text
      },
      votes: {
        type: GraphQLInt,
        resolve: answer => answer.votes
      }
    })
  })
);

const PollType = registerType(
  new GraphQLObjectType({
    name: "Poll",
    description: "polls data",
    fields: () => ({
      id: globalIdField("Poll"),
      _id: {
        type: GraphQLString,
        resolve: poll => poll._id
      },
      name: {
        type: GraphQLString,
        resolve: poll => poll.name
      },
      description: {
        type: GraphQLString,
        resolve: poll => poll.description
      },
      answers: {
        type: new GraphQLList(AnswerType),
        resolve: poll => poll.answers
      },
      active: {
        type: GraphQLBoolean,
        resolve: poll => poll.active
      }
    }),
    interfaces: () => [nodeInterface]
  })
);

export default PollType;

export const PollConnection = connectionDefinitions({
  name: "Poll",
  nodeType: PollType
});
