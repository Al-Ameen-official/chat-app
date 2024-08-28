import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { cacheDirectiveTransformer } from "@hubspire/cache-directive";
import { rateLimitDirectiveTransformer } from "@hubspire/rate-limiter";
import { GraphQLScalarType, Kind } from "graphql";
import { GraphQLDateTime, GraphQLEmailAddress, GraphQLJSON } from "graphql-scalars";
import path from "path";
import { authDirectiveTransformer } from "../libs/directives/auth.directive";
import { TModule } from "../libs/types";
import AccountDataSource from "./auth/account.datasource";
import ChatDataSource from "./chat/chat.datasource";
import GroupDataSource from "./group/group.datasource";
import HelloDataSource from "./hello/hello.datasource";
import MessageDataSource from "./message/message.datasource";
import UserDataSource from "./user/user.datasource";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.resolve(__dirname + "/**/*.graphql"), {
    extensions: ["graphql"],
  })
);
const resolvers = mergeResolvers(
  loadFilesSync(path.resolve(__dirname + "/**/*.resolver.{ts,js}"), {
    extensions: ["ts", "js"],
  })
);

export const Modules: TModule = {
  dataSources: {
    userDataSource: new UserDataSource(),
    helloDataSource: new HelloDataSource(),
    accountDataSource: new AccountDataSource(),
    chatDataSource: new ChatDataSource(),
    messageDataSource: new MessageDataSource(),
    groupDataSource: new GroupDataSource(),
  },
  schemas: rateLimitDirectiveTransformer(
    cacheDirectiveTransformer(
      authDirectiveTransformer(
        makeExecutableSchema({
          typeDefs: typeDefs,
          resolvers: {
            ...resolvers,
            ...{ JSON: GraphQLJSON },
            ...{ DateTime: GraphQLDateTime },
            ...{ EmailAddress: GraphQLEmailAddress },
            ...{
              Password: new GraphQLScalarType({
                name: "Password",
                description: "Password custom scalar type",
                serialize(value) {
                  if (value instanceof String) return value;
                  throw Error("the type should be a string");
                },
                parseValue(value) {
                  if (
                    typeof value === "string" &&
                    value.length >= 4 &&
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).*$/.test(value)
                  )
                    return value;
                  throw Error("invalid password");
                },
                parseLiteral(ast) {
                  if (ast.kind === Kind.STRING) return ast.value;
                  return null;
                },
              }),
            },
          },
        })
      )
    )
  ),
};
