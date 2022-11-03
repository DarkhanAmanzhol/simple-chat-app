const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "prisma", ".env") });
const jwt = require("jsonwebtoken");

const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolver.js"));

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const { authorization } = req.headers;
      if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        return { userId };
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(5000, () => {
    console.log("Graphql app in running");
  });
}

startApolloServer();
