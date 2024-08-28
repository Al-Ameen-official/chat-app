import DataLoader from "dataloader";
import { ChatByIdBatchFunc } from "../modules/chat/chat.loader";
import { UserByIdBatchFunc } from "../modules/user/user.loader";

const loaders = {
  userByIdLoader: new DataLoader(UserByIdBatchFunc),
  chatByIdLoader: new DataLoader(ChatByIdBatchFunc),
};

export function getLoaders() {
  return loaders;
}
