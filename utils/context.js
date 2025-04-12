import { verifyToken } from "./verifyToken.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const context = async ({ req }) => {
  // const authHeader = req?.headers?.authorization || "";
  // console.log(authHeader);
  const token = req?.headers?.authorization?.split("Bearer ")[1];

  const contextData = {};
  console.log(token);

  // if (!token) return {};
  if (token) {
    try {
  const decoded = verifyToken(token);
  const user = await User.findById(decoded?._id);
  if (!user) throw new Error("User not found");

  return { user };
} catch (err) {
  if (err.message === "TOKEN_EXPIRED") {
    console.warn("Token is expired, you may need to refresh it.");
    // Optionally trigger a token refresh mechanism here if supported
  } else {
    console.error("TOKEN_VERIFICATION_ERROR:", err.message);
  }
  return {};
}

  }
};
