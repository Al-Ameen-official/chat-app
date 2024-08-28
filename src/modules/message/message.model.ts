import { Document, Model, model, Schema, Types } from "mongoose";
import { MessageType } from "../../libs/types";

type IMessage = {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  rec: Types.ObjectId;
  chatId: Types.ObjectId;
  message: String;
  messageType: MessageType;
  read: Boolean;
  isGroupMessage: Boolean;
  isDeleted: Boolean;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;
export interface IMessageDocument extends IMessage, Document {}

export interface IMessageModel extends Model<IMessageDocument> {}

const MessageSchema = new Schema<IMessageDocument, IMessageModel>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    message: {
      type: String,
      required: false,
      trim: true,
    },
    messageType: {
      type: String,
      enum: ["AUDIO", "DOC", "TEXT", "VIDEO"],
      required: true,
    },
    chatId: {
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
    isGroupMessage: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model<IMessageDocument, IMessageModel>("message", MessageSchema);
