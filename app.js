import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createYoga, createSchema } from "graphql-yoga";
import { resolvers } from "./graphql/resolvers/index.js";
import { typeDefs } from "./graphql/types/index.js";

// loading environment variables
dotenv.config();

// create express app
const app = express();

// Define a GraphQL schema
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

// yoga middleware
app.use("/graphql", yoga);

// Connect to DB
const MONGODB = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB)
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () =>
      console.log(`Connected to MongoDB and listening on port ${port}...`)
    );
  })
  .catch((err) => console.error(err));
