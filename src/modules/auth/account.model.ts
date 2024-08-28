import { Document, Model, model, Schema, Types } from "mongoose";

type IAuth = {
  userId: Types.ObjectId;
  refreshtoken: string;
  lastTokenGenerated: string;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IAuthDocument extends IAuth, Document {}

export interface IAuthModel extends Model<IAuthDocument> {}

const AuthSchema = new Schema<IAuthDocument, IAuthModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "users",
    },
    refreshtoken: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    lastTokenGenerated: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AuthModel = model<IAuthDocument, IAuthModel>("auth", AuthSchema);
