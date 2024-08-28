import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import { JwtPayload } from "jsonwebtoken";
import { Server } from "socket.io";
import AccountDataSource from "../../modules/auth/account.datasource";
import ChatDataSource from "../../modules/chat/chat.datasource";
import GroupDataSource from "../../modules/group/group.datasource";
import HelloDataSource from "../../modules/hello/hello.datasource";
import MessageDataSource from "../../modules/message/message.datasource";
import UserDataSource from "../../modules/user/user.datasource";
import { getLoaders } from "../config";
export * from "./generated/base-types";

export type TCurrentUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  preferedName: string;
};
export interface ChatAppContext {
  socket: Server;
  me?: JwtPayload;
  currentUser?: TCurrentUser;
  accessToken?: string;
  serviceAdmin: boolean;
  dataSources: TDataSourceContext;
  cacheContext: CacheContext;
  loaders: ReturnType<typeof getLoaders>;
  ipAddress: string;
}

export type TDataSourceContext = {
  userDataSource: UserDataSource;
  helloDataSource: HelloDataSource;
  accountDataSource: AccountDataSource;
  chatDataSource: ChatDataSource;
  messageDataSource: MessageDataSource;
  groupDataSource: GroupDataSource;
};

export type TModule = {
  schemas: GraphQLSchema;
  dataSources: TDataSourceContext;
};
