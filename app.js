import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// loading environment variables
dotenv.config();

// create express app
const app = express();

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
