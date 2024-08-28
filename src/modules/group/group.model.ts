import { Document, Model, model, Schema, Types } from "mongoose";

type IGroup = {
  createdBy: Types.ObjectId;
  totalMessages: Number;
  title: String;
  description: String;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IGroupDocument extends IGroup, Document {}

export interface IGroupModel extends Model<IGroupDocument> {}

const GroupSchema = new Schema<IGroupDocument, IGroupModel>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    totalMessages: {
      type: Number,
      required: false,
      unique: false,
      default: 0,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GroupModel = model<IGroupDocument, IGroupModel>("group", GroupSchema);
