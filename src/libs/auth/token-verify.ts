import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { toString } from "lodash";
export function ServiceVerify(req: Partial<Request>) {
  return !!req.headers && req.headers["service-token"] === process.env.SERVICE_TOKEN;
}
export function TokenVerify(token: string) {
  try {
    if (token) {
      const response = jwt.verify(token, toString(process.env.JWT_LOGIN_SECRET));
      console.log("TOKEN VERIFY RES", response);
      return response as JwtPayload;
    }
  } catch (err) {
    console.log("ERROR HAPPENDE WHILE VERIFYING TOKEN", err);
  }
  return null;
}
