import express from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
  deleteCommentById
} from "../controllers/comments.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const commentRouter = express.Router();

commentRouter.post("/", authMiddleware, createComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getCommentById);
commentRouter.delete("/:id", authMiddleware, deleteCommentById);

export default commentRouter;
