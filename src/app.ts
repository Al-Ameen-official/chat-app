require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginInlineTraceDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from "@apollo/server/plugin/landingPage/default";
import { CacheService, responseCachePlugin } from "@hubspire/cache-directive";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import expressWinston from "express-winston";
import http from "http";
import { get, omit } from "lodash";
import mongoose from "mongoose";
import { Server } from "socket.io";
import winston from "winston";
import { ServiceVerify } from "./libs/auth/token-verify";
import { getLoaders } from "./libs/config";
import { ChatAppContext } from "./libs/types";
import { Modules } from "./modules";
(async function ApolloServerInit() {
  const app = express();
  if (process.env.NODE_ENV === "production") {
    app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.json(),
        colorize: false,
      })
    );
  }
  const httpServer = http.createServer(app);
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    socket.on("JOIN", ({ userId }) => {
      socket.join(userId.toString());
      console.log(`User with ID ${userId} joined their room.`);
      console.log(socket.rooms.values());
    });

    socket.on("send name", (username) => {
      io.emit("send name", username);
    });
    socket.on("SEND_DIRECT_MESSAGE", (chat) => {
      io.emit("SEND_DIRECT_MESSAGE", chat);
    });
    socket.on("UPDATE_DIRECT_MESSAGE", (chat) => {
      io.emit("UPDATE_DIRECT_MESSAGE", chat);
    });
    socket.on("UPDATE_GROUP_MESSAGE", (chat) => {
      io.emit("UPDATE_GROUP_MESSAGE", chat);
    });
    socket.on("DELETE_DIRECT_MESSAGE", (chat) => {
      io.emit("DELETE_DIRECT_MESSAGE", chat);
    });
    socket.on("DELETE_GROUP_MESSAGE", (chat) => {
      io.emit("DELETE_GROUP_MESSAGE", chat);
    });
    socket.on("SEND_GROUP_MESSAGE", (group) => {
      io.emit("SEND_GROUP_MESSAGE", group);
    });
    socket.on("CREATE_DREACTION", (group) => {
      io.emit("CREATE_DREACTION", group);
    });
    socket.on("DELETE_DREACTION", (group) => {
      io.emit("DELETE_DREACTION", group);
    });
  });

  const server = new ApolloServer<ChatAppContext>({
    schema: Modules.schemas,
    csrfPrevention: true,
    plugins: [
      responseCachePlugin<ChatAppContext>(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginInlineTraceDisabled(),
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: false,
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    introspection: process.env.APOLLO_INTROSPECTION === "true",
    formatError: (error) => {
      return {
        ...error,
        extensions: {
          ...omit(get(error, "extensions"), "stacktrace"),
        },
      };
    },
  });
  const cache = await CacheService.start({
    cache_prefix: "ChatApp",
    cache_mode: "redis",
    redis_host: String(process.env.REDIS_HOST),
    redis_port: Number(process.env.REDIS_PORT),
  });
  await mongoose.connect(String(process.env.DB_URL), {});
  await server.start();

  app.get("/chat-app/health", (req, res) => {
    res.send({ status: "ok" });
  });
  app.use(
    "/chat-app",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async (payload) => {
        const serviceAdmin = ServiceVerify(payload.req);
        const sessionId = serviceAdmin
          ? (payload.req?.headers?.["service-token"] as string)
          : payload.req?.headers?.authorization?.split(" ")[1] || null;
        return {
          socket: io,
          accessToken: payload.req?.headers?.authorization?.split(" ")[1],
          serviceAdmin,
          dataSources: Modules.dataSources,
          cacheContext: {
            cache,
            sessionId,
          },
          loaders: getLoaders(),
          ipAddress: payload.req.ip as string,
        };
      },
    })
  );

  const port = process.env.PORT || 4100;
  httpServer.listen(port, () => {
    console.log("\x1b[33m", `Server ready at http://localhost:${port}/chat-app`, "\x1b[0m");
  });
})();
