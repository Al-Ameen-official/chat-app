import { GraphQLError } from "graphql";
import { get, toString } from "lodash";
import { TokenVerify } from "../../libs/auth/token-verify";
import { Resolvers } from "../../libs/types";

export default {
  Query: {
    currentUser: async (parent, args, context, info) => {
      if (context.accessToken) {
        console.log("ACCESS TOKEN", context.accessToken);
        const me = TokenVerify(context.accessToken);
        const user = await context.dataSources.userDataSource.getUserById(toString(get(me, "userId")));
        return user;
      } else {
        throw new GraphQLError("NOT AUTHENTICATED");
      }
    },
  },
  Mutation: {
    logIn: (parent, { email, password }, context, info) => context.dataSources.accountDataSource.logIn(email, password),
    logout: (parent, args, context, info) => context.dataSources.accountDataSource.logOut(args.userId),
    genToken: (parent, args, context, info) => context.dataSources.accountDataSource.genTokenFromRefreshToken(args.refreshToken),
  },
} as Resolvers;
