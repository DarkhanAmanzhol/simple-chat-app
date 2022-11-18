const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "prisma", ".env") });
const jwt = require("jsonwebtoken");

const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolver.js"));

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const { authorization } = req.headers;
      if (authorization) {
        try {
          const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

          return { userId };
        } catch (err) {
          console.log(err.message);
        }
      }
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    const wsServer = new WebSocketServer({
      server,
      path: "/graphql",
    });

    useServer({ schema }, wsServer);
    console.log("Graphql app in running");
  });
}

startApolloServer();
