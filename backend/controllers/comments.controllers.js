import Comment from "../models/comments.models.js";
import Question from "../models/questions.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMessage } from "../utils/sendMessage.js";

export const createComment = asyncHandler(async (req, res) => {
  const { que, comment } = req.body;

  if (!que || !comment) {
    return sendMessage(res, 400, "Question ID and comment are required");
  }

  const question = await Question.findById(que);
  if (!question) {
    return sendMessage(res, 404, "Question not found");
  }

  const newComment = await Comment.create({
    que,
    comment,
    user: req.user._id
  });

  return sendMessage(res, 201, {
    msg: "Comment added successfully",
    data: newComment
  });
});

export const getAllComments = asyncHandler(async (req, res) => {
  const { que } = req.query;
  const filter = que ? { que } : {};

  const comments = await Comment.find(filter)
    .populate("user", "name email")
    .populate("replies");

  return sendMessage(res, 200, {
    msg: "Comments fetched",
    data: comments
  });
});

export const getCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id)
    .populate("user", "name email")
    .populate("replies");

  if (!comment) {
    return sendMessage(res, 404, "Comment not found");
  }

  return sendMessage(res, 200, {
    msg: "Comment found",
    data: comment
  });
});

export const deleteCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    return sendMessage(res, 404, "Comment not found");
  }

  if (String(comment.user) !== String(req.user._id)) {
    return sendMessage(res, 403, "Not authorized to delete this comment");
  }

  await comment.deleteOne();
  return sendMessage(res, 200, "Comment deleted successfully");
});
