import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { get } from "lodash";
import { Modules } from "../../modules";
import { TokenVerify } from "../auth/token-verify";

const serviceAdminDirectiveArgumentMaps: Record<string, any> = {};
const authDirectiveArgumentMaps: Record<string, any> = {};

export const authDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_TYPE]: (type, schema) => {
      const serviceAdminDirective = getDirective(schema, type, "serviceAdmin")?.[0];
      const authDirective = getDirective(schema, type, "auth")?.[0];
      if (serviceAdminDirective) serviceAdminDirectiveArgumentMaps[type.name] = serviceAdminDirective;
      if (authDirective) authDirectiveArgumentMaps[type.name] = authDirective;

      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const serviceAdminDirective = getDirective(schema, fieldConfig, "serviceAdmin")?.[0] ?? serviceAdminDirectiveArgumentMaps[typeName];
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0] ?? serviceAdminDirectiveArgumentMaps[typeName];

      if (serviceAdminDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        delete serviceAdminDirectiveArgumentMaps[typeName];
        fieldConfig.resolve = function (source, args, context, info) {
          if (context.serviceAdmin) return resolve(source, args, context, info);
          throw new GraphQLError("invalid service token");
        };
        return fieldConfig;
      }
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        delete authDirectiveArgumentMaps[typeName];
        fieldConfig.resolve = async function (source, args, context, info) {
          const user = TokenVerify(context.accessToken);
          const currentUser = await Modules.dataSources.userDataSource.getUserById(get(user, "userId"));

          if (currentUser) {
            console.log(currentUser);
            context.currentUser = user;
            return resolve(source, args, context, info);
          }
          throw new GraphQLError("Not Authenticated, Not Allowed");
        };
        return fieldConfig;
      }
    },
  });
