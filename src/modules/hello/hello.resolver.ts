import { Resolvers } from "../../libs/types";

export default {
  Query: {
    chatAppHello: (parent, args, context, info) => context.dataSources.helloDataSource.sayHello(),
  },
} as Resolvers;
