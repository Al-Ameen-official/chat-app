import { Document, Model, model, Schema, Types } from "mongoose";

type IReaction = {
  senderId: Types.ObjectId;
  messageId: Types.ObjectId;
  reaction: String;
  isDeleted: Boolean;
  read: Boolean;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;
export interface IReactionDocument extends IReaction, Document {}

export interface IReactionModel extends Model<IReactionDocument> {}

const ReactionSchema = new Schema<IReactionDocument, IReactionModel>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    reaction: {
      type: String,
      required: false,
      trim: true,
    },
    messageId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    read: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ReactionModel = model<IReactionDocument, IReactionModel>("reaction", ReactionSchema);
