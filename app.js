import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// loading environment variables
dotenv.config();

// create express app
const app = express();

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {});
