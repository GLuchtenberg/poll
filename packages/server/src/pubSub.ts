import { PubSub } from "graphql-subscriptions";

export const EVENTS = {
  USER: {
    ADDED: "USER_ADDED"
  },
  POLL: {
    ADDED: "POOL_ADDED"
  }
};

export default new PubSub();
