import Answer from "../models/answers.models.js";
import Question from "../models/questions.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMessage } from "../utils/sendMessage.js";

export const createAnswer = asyncHandler(async (req, res) => {
  const { que, answerData } = req.body;

  if (!que || !answerData) {
    return sendMessage(res, 400, "Question ID and answer data are required");
  }

  const question = await Question.findById(que);
  if (!question) {
    return sendMessage(res, 404, "Question not found");
  }

  const newAnswer = await Answer.create({
    que,
    answerData,
    user: req.user._id
  });

  question.answers.push(newAnswer._id);
  await question.save();

  return sendMessage(res, 201, {
    msg: "Answer submitted successfully",
    data: newAnswer
  });
});

export const getAnswersByQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const answers = await Answer.find({ que: questionId })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  return sendMessage(res, 200, {
    msg: "Answers fetched",
    data: answers
  });
});

export const getAnswerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const answer = await Answer.findById(id).populate("user", "name email");

  if (!answer) {
    return sendMessage(res, 404, "Answer not found");
  }

  return sendMessage(res, 200, {
    msg: "Answer found",
    data: answer
  });
});

export const deleteAnswerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const answer = await Answer.findById(id);
  if (!answer) {
    return sendMessage(res, 404, "Answer not found");
  }

  if (String(answer.user) !== String(req.user._id)) {
    return sendMessage(res, 403, "Not authorized to delete this answer");
  }

  await answer.deleteOne();
  return sendMessage(res, 200, "Answer deleted successfully");
});
