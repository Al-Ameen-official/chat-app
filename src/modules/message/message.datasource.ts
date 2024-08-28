import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, isEmpty, map, omit, set, size } from "lodash";
import { PipelineStage } from "mongoose";
import {
  ChatAppContext,
  CreateMessageInput,
  CreateReactionInput,
  MutationDeleteManyMessageArgs,
  QueryGetAllMessageArgs,
  QueryGetAllMessageCountArgs,
  QueryGetAllReactionArgs,
  QueryGetAllReactionCountArgs,
  QueryGetOneMessageArgs,
  UpdateMessageInput,
  UpdateReactionInput,
} from "../../libs/types";
import { MessageModel } from "./message.model";
import { ReactionModel } from "./reaction.model";

export default class MessageDataSource {
  private readonly model = MessageModel;
  private readonly reactionModel = ReactionModel;

  async getAllMessage(args: QueryGetAllMessageArgs) {
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
  async getAllReaction(args: QueryGetAllReactionArgs) {
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

    return this.reactionModel.aggregate(pipelines);
  }
  async getAllMessageCount(args: QueryGetAllMessageCountArgs) {
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
  async getAllReactionCount(args: QueryGetAllReactionCountArgs) {
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

    return (await this.reactionModel.aggregate(pipelines))[0]?.totalCount || 0;
  }
  async getMessageById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneMessage(args: QueryGetOneMessageArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createMessage(data: CreateMessageInput, context: ChatAppContext) {
    const result = new this.model({ ...data });
    data.isGroupMessage ? context.socket.emit("SEND_GROUP_MESSAGE", data) : context.socket.emit("SEND_DIRECT_MESSAGE", data);
    return result.save();
  }
  async createReaction(data: CreateReactionInput, context: ChatAppContext) {
    const result = new this.reactionModel({ ...data });
    context.socket.emit("CREATE_REACTION", data);
    return result.save();
  }
  async createManyMessage(datas: CreateMessageInput[], context: ChatAppContext) {
    const results = datas.map((input) => this.createMessage(input, context));
    return Promise.all(results);
  }

  async updateMessage(data: UpdateMessageInput, context: ChatAppContext) {
    const result = await this.model.findById(data._id);
    if (!result) throw new GraphQLError("result not found");
    data.isGroupMessage ? context.socket.emit("UPDATE_GROUP_MESSAGE", data) : context.socket.emit("UPDATE_DIRECT_MESSAGE", data);

    for (const field in omit(data, "_id")) set(result, field, get(data, field));

    return result.save();
  }
  async updateReaction(data: UpdateReactionInput) {
    const result = await this.reactionModel.findById(data._id);
    if (!result) throw new GraphQLError("result not found");

    for (const field in omit(data, "_id")) set(result, field, get(data, field));

    return result.save();
  }
  async updateManyMessage(datas: UpdateMessageInput[], context: ChatAppContext) {
    const results = datas.map((input: UpdateMessageInput) => this.updateMessage(input, context));

    return Promise.all(results);
  }

  async deleteMessage(_id: string, context: ChatAppContext) {
    const result = await this.model.findById(_id);
    if (!result) throw new GraphQLError("result not found");
    result.isGroupMessage ? context.socket.emit("DELETE_GROUP_MESSAGE", { _id }) : context.socket.emit("DELETE_DIRECT_MESSAGE", { _id });

    await this.model.deleteOne({ _id });
    return result;
  }
  async deleteReaction(_id: string, context: ChatAppContext) {
    const result = await this.model.findById(_id);
    if (!result) throw new GraphQLError("result not found");
    context.socket.emit("DELETE_REACTION", { _id });

    if (result.senderId.toString() == context.currentUser?._id) {
      await this.reactionModel.deleteOne({ _id });
      return true;
    }
    return false;
  }

  async deleteManyMessage(args: MutationDeleteManyMessageArgs) {
    const results = await this.model.find(args.filter);
    if (isEmpty(results)) throw new GraphQLError("results not found");

    await this.model.deleteMany({ _id: { $in: map(results, "_id") } });
    return results;
  }
}
