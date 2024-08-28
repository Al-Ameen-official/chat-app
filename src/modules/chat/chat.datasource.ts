import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, isEmpty, map, omit, set, size } from "lodash";
import { PipelineStage } from "mongoose";
import {
  ChatAppContext,
  CreateChatInput,
  MutationDeleteManyChatArgs,
  QueryGetAllChatArgs,
  QueryGetAllChatCountArgs,
  QueryGetOneChatArgs,
  UpdateChatInput,
} from "../../libs/types";
import { ChatModel } from "./chat.model";

export default class ChatDataSource {
  private readonly model = ChatModel;

  async getAllChat(args: QueryGetAllChatArgs) {
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

  async getAllChatCount(args: QueryGetAllChatCountArgs) {
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

  async getChatById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneChat(args: QueryGetOneChatArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createChat(data: CreateChatInput, context: ChatAppContext) {
    const user = new this.model({ userId: context.currentUser?._id, ...data });
    return user.save();
  }

  async createManyChat(datas: CreateChatInput[], context: ChatAppContext) {
    const users = datas.map((input: CreateChatInput) => this.createChat(input, context));
    return Promise.all(users);
  }

  async updateChat(data: UpdateChatInput) {
    const user = await this.model.findById(data._id);
    if (!user) throw new GraphQLError("user not found");

    for (const field in omit(data, "_id")) set(user, field, get(data, field));

    return user.save();
  }

  async updateManyChat(datas: UpdateChatInput[]) {
    const users = datas.map((input: UpdateChatInput) => this.updateChat(input));
    return Promise.all(users);
  }

  async deleteChat(_id: string) {
    const user = await this.model.findById(_id);
    if (!user) throw new GraphQLError("user not found");

    await this.model.deleteOne({ _id });
    return user;
  }

  async deleteManyChat(args: MutationDeleteManyChatArgs) {
    const users = await this.model.find(args.filter);
    if (isEmpty(users)) throw new GraphQLError("users not found");

    await this.model.deleteMany({ _id: { $in: map(users, "_id") } });
    return users;
  }
}
