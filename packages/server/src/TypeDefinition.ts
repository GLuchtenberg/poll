import Dataloader from "dataloader";

import { IUser } from "./modules/user/UserModel";
import { IPoll } from "./modules/poll/PollModel";

type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
  PollLoader: Dataloader<Key, IPoll>;
};

export type GraphQLContext = {
  user?: IUser;
  dataloaders: Dataloaders;
};
