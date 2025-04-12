import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  // return jwt.verify(token, process.env.JWT_SECRET);
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
