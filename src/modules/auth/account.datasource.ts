import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { get, toString, trim } from "lodash";
import { Types } from "mongoose";
import { UserModel } from "../user/user.model";
import { AuthModel } from "./account.model";
export default class AccountDataSource {
  private readonly authModel = AuthModel;
  private readonly model = UserModel;

  async logIn(email: string, password: string) {
    const user = await this.model.findOne({ email: email });
    if (!user) throw new GraphQLError("Oops!! user not found please contact admin");
    if (!user.comparePassword(trim(password))) new GraphQLError("Wrong Password please try again");
    const tokens = await this.genToken(toString(user._id));
    const token = new this.authModel({
      userId: user._id,
      lastTokenGenerated: tokens.token,
      refreshtoken: tokens.refreshToken,
    });
    await token.save();
    return tokens;
  }
  async genToken(userId: string) {
    return {
      token: jwt.sign({ userId }, String(process.env.JWT_LOGIN_SECRET), { expiresIn: "1d" }),
      refreshToken: jwt.sign({ userId }, String(process.env.JWT_REFRESH_TOKEN_SECRET), { expiresIn: "1d" }),
    };
  }
  async logOut(userId: string) {
    await this.authModel.deleteMany({ userId: new Types.ObjectId(userId) });
    return {
      status: true,
      message: "logOut Successful",
    };
  }

  async genTokenFromRefreshToken(token: string) {
    const refreshToken = jwt.verify(token, toString(process.env.JWT_REFRESH_TOKEN_SECRET));
    if (!refreshToken) throw new GraphQLError("Token Expired Please LogIn");
    const authToken = await this.authModel.findOne({ refreshtoken: token });
    if (!refreshToken) throw new GraphQLError("Token Not Found Please LogIN");
    return jwt.sign({ userId: get(refreshToken, "users") }, String(process.env.JWT_LOGIN_SECRET), { expiresIn: "1d" });
  }
}
