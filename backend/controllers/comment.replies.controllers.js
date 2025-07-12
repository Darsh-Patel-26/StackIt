import Reply from "../models/comment.replies.models.js";
import Comment from "../models/comments.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMessage } from "../utils/sendMessage.js";

export const createReply = asyncHandler(async (req, res) => {
  const { comment, reply } = req.body;

  if (!comment || !reply) {
    return sendMessage(res, 400, "Comment ID and reply text are required");
  }

  const commentExists = await Comment.findById(comment);
  if (!commentExists) {
    return sendMessage(res, 404, "Comment not found");
  }

  const newReply = await Reply.create({
    comment,
    reply,
    user: req.user._id
  });

  commentExists.replies.push(newReply._id);
  await commentExists.save();

  return sendMessage(res, 201, {
    msg: "Reply added successfully",
    data: newReply
  });
});

export const getAllReplies = asyncHandler(async (req, res) => {
  const { comment } = req.query;
  const filter = comment ? { comment } : {};

  const replies = await Reply.find(filter)
    .populate("user", "name email");

  return sendMessage(res, 200, {
    msg: "Replies fetched",
    data: replies
  });
});

export const getReplyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reply = await Reply.findById(id).populate("user", "name email");
  if (!reply) {
    return sendMessage(res, 404, "Reply not found");
  }

  return sendMessage(res, 200, {
    msg: "Reply found",
    data: reply
  });
});

export const deleteReplyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reply = await Reply.findById(id);
  if (!reply) {
    return sendMessage(res, 404, "Reply not found");
  }

  if (String(reply.user) !== String(req.user._id)) {
    return sendMessage(res, 403, "Not authorized to delete this reply");
  }

  await reply.deleteOne();
  return sendMessage(res, 200, "Reply deleted successfully");
});
