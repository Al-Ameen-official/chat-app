import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getMessageById: (parent, args, context, info) => context.dataSources.messageDataSource.getMessageById(String(args._id)),
    getAllMessage: (parent, args, context, info) => context.dataSources.messageDataSource.getAllMessage(args),
    getAllReaction: (parent, args, context, info) => context.dataSources.messageDataSource.getAllReaction(args),
    getOneMessage: (parent, args, context, info) => context.dataSources.messageDataSource.getOneMessage(args),
    getAllMessageCount: (parent, args, context, info) => context.dataSources.messageDataSource.getAllMessageCount(args),
    getAllReactionCount: (parent, args, context, info) => context.dataSources.messageDataSource.getAllReactionCount(args),
  },
  Mutation: {
    createReaction: (parent, args, context, info) => context.dataSources.messageDataSource.createReaction(args.data, context),
    createMessage: (parent, args, context, info) => context.dataSources.messageDataSource.createMessage(args.data, context),
    createManyMessage: (parent, args, context, info) => context.dataSources.messageDataSource.createManyMessage(args.datas, context),
    updateMessage: (parent, args, context, info) => context.dataSources.messageDataSource.updateMessage(args.data, context),
    updateManyMessage: (parent, args, context, info) => context.dataSources.messageDataSource.updateManyMessage(args.datas, context),
    deleteMessage: (parent, args, context, info) => context.dataSources.messageDataSource.deleteMessage(String(args._id), context),
    deleteManyMessage: (parent, args, context, info) => context.dataSources.messageDataSource.deleteManyMessage(args),
    deleteReaction: (parent, args, context, info) => context.dataSources.messageDataSource.deleteReaction(args._id, context),
  },
  Message: {
    sender: (parent, args, context, info) => context.loaders.userByIdLoader.load(parent.senderId.toString()),
    receiver: (parent, args, context, info) => context.loaders.userByIdLoader.load(parent.receiverId.toString()),
    chat: (parent, args, context, info) => context.loaders.chatByIdLoader.load(parent.chatId.toString()),
    reactions: async (parent, args, context, info) => {
      args.filter = { ...args.filter, messageId: parent._id };
      return context.dataSources.messageDataSource.getAllReaction(args);
    },
  },
} as Resolvers;
