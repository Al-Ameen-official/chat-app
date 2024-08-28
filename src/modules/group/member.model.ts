import { Document, Model, model, Schema, Types } from "mongoose";

type IMember = {
  totalUnreadMessages: Number;
  username: String;
  userId: Types.ObjectId;
  isAdmin: Boolean;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IMemberDocument extends IMember, Document {}

export interface IMemberModel extends Model<IMemberDocument> {}

const memberSchema = new Schema<IMemberDocument, IMemberModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    totalUnreadMessages: {
      type: Number,
      required: false,
      unique: false,
      default: 0,
    },
    username: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MemberModel = model<IMemberDocument, IMemberModel>("member", memberSchema);
