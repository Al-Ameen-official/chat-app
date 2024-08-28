import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, isEmpty, map, omit, set, size } from "lodash";
import { PipelineStage } from "mongoose";
import {
  AddMember,
  ChatAppContext,
  CreateGroupInput,
  MutationDeleteManyGroupArgs,
  QueryGetAllGroupArgs,
  QueryGetAllGroupCountArgs,
  QueryGetOneGroupArgs,
  UpdateGroupInput,
  UpdateMember,
} from "../../libs/types";
import { GroupModel } from "./group.model";
import { MemberModel } from "./member.model";

export default class GroupDataSource {
  private readonly model = GroupModel;
  private readonly memberMode = MemberModel;
  async getAllGroup(args: QueryGetAllGroupArgs) {
    const pipelines: PipelineStage[] = [];
    const limit = Number(args.limit) || 10;
    const offset = Number(args.offset) || 0;

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    size(args.search?.trim()) <= 2 && pipelines.push({ $sort: args.sort || { createdAt: -1 } });
    pipelines.push({ $skip: offset });
    pipelines.push({ $limit: limit });

    return this.model.aggregate(pipelines);
  }

  async getAllGroupCount(args: QueryGetAllGroupCountArgs) {
    const pipelines: PipelineStage[] = [];

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    pipelines.push({ $count: "totalCount" });

    return (await this.model.aggregate(pipelines))[0]?.totalCount || 0;
  }

  async getGroupById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneGroup(args: QueryGetOneGroupArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createGroup(data: CreateGroupInput, context: ChatAppContext) {
    const group = new this.model({ groupId: context.currentUser?._id, ...data });
    const member = new this.memberMode({
      userId: context.currentUser?._id,
      totalUnreadMessages: 0,
      userName: context.currentUser?.preferedName,
      isAdmin: true,
    });
    await member.save();
    return group.save();
  }

  async createMember(data: AddMember) {
    const member = new this.memberMode({
      ...data,
    });
    return member.save();
  }
  async updateMember(data: UpdateMember) {
    const group = await this.memberMode.findOne({ userId: data.userId });
    if (!group) throw new GraphQLError("user not found");

    for (const field in omit(data, "_id")) set(group, field, get(data, field));

    return group.save();
  }
  async createManyGroup(datas: CreateGroupInput[], context: ChatAppContext) {
    const groups = datas.map((input: CreateGroupInput) => this.createGroup(input, context));
    return Promise.all(groups);
  }

  async updateGroup(data: UpdateGroupInput) {
    const group = await this.model.findById(data._id);
    if (!group) throw new GraphQLError("group not found");

    for (const field in omit(data, "_id")) set(group, field, get(data, field));

    return group.save();
  }

  async updateManyGroup(datas: UpdateGroupInput[]) {
    const groups = datas.map((input: UpdateGroupInput) => this.updateGroup(input));
    return Promise.all(groups);
  }

  async deleteGroup(_id: string) {
    const group = await this.model.findById(_id);
    if (!group) throw new GraphQLError("group not found");

    await this.model.deleteOne({ _id });
    return group;
  }

  async deleteManyGroup(args: MutationDeleteManyGroupArgs) {
    const groups = await this.model.find(args.filter);
    if (isEmpty(groups)) throw new GraphQLError("groups not found");

    await this.model.deleteMany({ _id: { $in: map(groups, "_id") } });
    return groups;
  }
}
