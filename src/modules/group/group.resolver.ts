import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getGroupById: (parent, args, context, info) => context.dataSources.groupDataSource.getGroupById(String(args._id)),
    getAllGroup: (parent, args, context, info) => context.dataSources.groupDataSource.getAllGroup(args),
    getOneGroup: (parent, args, context, info) => context.dataSources.groupDataSource.getOneGroup(args),
    getAllGroupCount: (parent, args, context, info) => context.dataSources.groupDataSource.getAllGroupCount(args),
  },
  Mutation: {
    addMember: (parent, args, context, info) => context.dataSources.groupDataSource.createMember(args.data),
    updateMember: (parent, args, context, info) => context.dataSources.groupDataSource.updateMember(args.data),
    createGroup: (parent, args, context, info) => context.dataSources.groupDataSource.createGroup(args.data, context),
    createManyGroup: (parent, args, context, info) => context.dataSources.groupDataSource.createManyGroup(args.datas, context),
    updateGroup: (parent, args, context, info) => context.dataSources.groupDataSource.updateGroup(args.data),
    updateManyGroup: (parent, args, context, info) => context.dataSources.groupDataSource.updateManyGroup(args.datas),
    deleteGroup: (parent, args, context, info) => context.dataSources.groupDataSource.deleteGroup(String(args._id)),
    deleteManyGroup: (parent, args, context, info) => context.dataSources.groupDataSource.deleteManyGroup(args),
  },
} as Resolvers;
