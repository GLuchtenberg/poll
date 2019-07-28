import DataLoader from "dataloader";
import {
  connectionFromMongoCursor,
  mongooseLoader
} from "@entria/graphql-mongoose-loader";
import { Types } from "mongoose";
import { ConnectionArguments } from "graphql-relay";
import mongoose from "mongoose";
declare type ObjectId = mongoose.Schema.Types.ObjectId;

import PollModel, { IPoll } from "./PollModel";

import { GraphQLContext } from "../../TypeDefinition";

export default class Poll {
  id: string;

  _id: Types.ObjectId;

  name: string;

  email: string | null | undefined;

  active: boolean | null | undefined;

  constructor(data: IPoll) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.name = data.description;
    this.active = data.active;
  }
}

export const getLoader = () =>
  new DataLoader((ids: ReadonlyArray<string>) =>
    mongooseLoader(PollModel, ids)
  );

const viewerCanSee = () => true;

export const load = async (
  context: GraphQLContext,
  id: string | Object | ObjectId
): Promise<Poll | null> => {
  if (!id && typeof id !== "string") {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.PollLoader.load(id as string);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new Poll(data) : null;
};

export const clearCache = (
  { dataloaders }: GraphQLContext,
  id: Types.ObjectId
) => dataloaders.PollLoader.clear(id.toString());

export const primeCache = (
  { dataloaders }: GraphQLContext,
  id: Types.ObjectId,
  data: IPoll
) => dataloaders.PollLoader.prime(id.toString(), data);

export const clearAndPrimeCache = (
  context: GraphQLContext,
  id: Types.ObjectId,
  data: IPoll
) => clearCache(context, id) && primeCache(context, id, data);

type PollArgs = ConnectionArguments & {
  search?: string;
};

export const loadPolls = async (context: GraphQLContext, args: PollArgs) => {
  const where = args.search
    ? { name: { $regex: new RegExp(`^${args.search}`, "ig") } }
    : {};
  const polls = PollModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: polls,
    context,
    args,
    loader: load
  });
};
