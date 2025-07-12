import jwt from "jsonwebtoken";
import { sendMessage } from "../utils/sendMessage.js";

export const authMiddleware = (req, res, next) => {
  let token = req.cookies?.token;

  // Check if token is sent in header as Bearer
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return sendMessage(res, 401, "Authentication token missing");
  }

  try {
    const secret = "sec3t"; // Or use process.env.JWT_SECRET
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return sendMessage(res, 401, "Invalid or expired token");
  }
};
