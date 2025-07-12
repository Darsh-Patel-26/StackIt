import express from "express";
import {
  createAnswer,
  getAnswersByQuestion,
  getAnswerById,
  deleteAnswerById
} from "../controllers/answer.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const answerRouter = express.Router();

answerRouter.post("/", authMiddleware, createAnswer);
answerRouter.get("/question/:questionId", getAnswersByQuestion);
answerRouter.get("/:id", getAnswerById);
answerRouter.delete("/:id", authMiddleware, deleteAnswerById);

export default answerRouter;
