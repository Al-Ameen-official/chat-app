import { Document, Model, model, Schema, Types } from "mongoose";

type IChat = {
  userId: Types.ObjectId;
  chatWith: Types.ObjectId;
  totalMessages: Number;
  isMute: Boolean;
  totalUnreadMessages: Number;
  isblocked: Boolean;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IChatDocument extends IChat, Document {}

export interface IChatModel extends Model<IChatDocument> {}

const ChatSchema = new Schema<IChatDocument, IChatModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "users",
    },
    totalMessages: {
      type: Number,
      required: false,
      unique: false,
      default: 0,
    },
    totalUnreadMessages: {
      type: Number,
      required: false,
      unique: false,
      default: 0,
    },
    chatWith: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    isMute: {
      type: Boolean,
      required: true,
    },
    isblocked: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ChatModel = model<IChatDocument, IChatModel>("chat", ChatSchema);
