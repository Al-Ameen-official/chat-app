import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getChatById: (parent, args, context, info) => context.dataSources.chatDataSource.getChatById(String(args._id)),
    getAllChat: (parent, args, context, info) => context.dataSources.chatDataSource.getAllChat(args),
    getOneChat: (parent, args, context, info) => context.dataSources.chatDataSource.getOneChat(args),
    getAllChatCount: (parent, args, context, info) => context.dataSources.chatDataSource.getAllChatCount(args),
  },
  Mutation: {
    createChat: (parent, args, context, info) => context.dataSources.chatDataSource.createChat(args.data, context),
    createManyChat: (parent, args, context, info) => context.dataSources.chatDataSource.createManyChat(args.datas, context),
    updateChat: (parent, args, context, info) => context.dataSources.chatDataSource.updateChat(args.data),
    updateManyChat: (parent, args, context, info) => context.dataSources.chatDataSource.updateManyChat(args.datas),
    deleteChat: (parent, args, context, info) => context.dataSources.chatDataSource.deleteChat(String(args._id)),
    deleteManyChat: (parent, args, context, info) => context.dataSources.chatDataSource.deleteManyChat(args),
  },
  Chat: {
    chatWithUser: (parent, args, context, info) => context.loaders.userByIdLoader.load(parent.chatWith.toString()),
    Messages: (parent, args, context, info) => {
      if (parent.userId) {
        args.filter = { ...args.filter, chatId: parent._id };
      }
    },
    user: (parent, args, context, info) => context.loaders.userByIdLoader.load(parent.userId.toString()),
  },
} as Resolvers;
