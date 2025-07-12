import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestionById
} from "../controllers/questions.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const questionRouter = express.Router();

questionRouter.post("/", authMiddleware, createQuestion);
questionRouter.get("/", getAllQuestions);
questionRouter.get("/:id", getQuestionById);
questionRouter.delete("/:id", authMiddleware, deleteQuestionById);

export default questionRouter;
