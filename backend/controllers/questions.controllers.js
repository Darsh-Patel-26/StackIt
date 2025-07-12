import Question from "../models/questions.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMessage } from "../utils/sendMessage.js";

export const createQuestion = asyncHandler(async (req, res) => {
  const { title, desc, tags, imageurl } = req.body;

  if (!title || !desc) {
    return sendMessage(res, 400, "Title and description are required");
  }

  const question = await Question.create({
    title,
    desc,
    tags,
    imageurl,
    owner: req.user._id
  });

  return sendMessage(res, 201, {
    msg: "Question created successfully",
    data: question
  });
});

export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()
    .populate("owner", "name email")
    .sort({ createdAt: -1 });

  return sendMessage(res, 200, {
    msg: "All questions fetched",
    data: questions
  });
});

export const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id)
    .populate("owner", "name email")
    .populate("answers");

  if (!question) {
    return sendMessage(res, 404, "Question not found");
  }

  return sendMessage(res, 200, {
    msg: "Question found",
    data: question
  });
});

export const deleteQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id);
  if (!question) {
    return sendMessage(res, 404, "Question not found");
  }

  if (String(question.owner) !== String(req.user._id)) {
    return sendMessage(res, 403, "Not authorized to delete this question");
  }

  await question.deleteOne();
  return sendMessage(res, 200, "Question deleted successfully");
});
