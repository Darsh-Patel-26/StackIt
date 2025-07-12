import express from "express";
import {
  createReply,
  getAllReplies,
  getReplyById,
  deleteReplyById
} from "../controllers/comment.replies.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const replyRouter = express.Router();

replyRouter.post("/", authMiddleware, createReply);
replyRouter.get("/", getAllReplies);
replyRouter.get("/:id", getReplyById);
replyRouter.delete("/:id", authMiddleware, deleteReplyById);

export default replyRouter;
