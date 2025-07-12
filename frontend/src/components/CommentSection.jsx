import { useEffect, useState } from "react";
import axios from "axios";
import ReplyForm from "./ReplyForm";

const CommentSection = ({ questionId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${questionId}`);
        setComments(res.data.message);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    fetchComments();
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/comments/${questionId}`, { comment });
      setComment("");
      const updated = await axios.get(`/comments/${questionId}`);
      setComments(updated.data.message);
    } catch (err) {
      setError("Error posting comment");
    }
  };

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-2">Comments</h4>

      {comments.map((c) => (
        <div key={c._id} className="border p-2 rounded mb-2">
          <p>{c.comment}</p>
          <small className="text-gray-500">Votes: {c.votes}</small>
          <ReplyForm commentId={c._id} />
          {c.replies?.length > 0 && (
            <div className="ml-4 mt-2 text-sm">
              <strong>Replies:</strong>
              {c.replies.map((r) => (
                <p key={r._id} className="ml-2">{r.reply}</p>
              ))}
            </div>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="space-y-2 mt-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Add a comment"
          required
        ></textarea>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
