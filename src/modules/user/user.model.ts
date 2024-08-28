import bcrypt from "bcryptjs";
import { Document, Model, model, Schema } from "mongoose";
type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IUserDocument extends IUser, Document {
  comparePassword: (userPassword: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    profileImage: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre<IUserDocument>("save", function (next) {
  const user = this;
  if (user.isModified("password") || !user.password) next();
  bcrypt.genSalt(Number(process.env.HASH_ROUNDS), function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
UserSchema.methods.comparePassword = function (userPassword: string) {
  return bcrypt.compare(userPassword, this.password);
};
export const UserModel = model<IUserDocument, IUserModel>("users", UserSchema);
