import { useState } from "react";
import axios from "axios";

const AnswerForm = ({ questionId, setQuestion }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/answers/${questionId}`, {
        answerData: text,
      });
      setText("");
      const updated = await axios.get(`/questions/${questionId}`);
      setQuestion(updated.data.message);
    } catch (err) {
      setError("Failed to submit answer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        placeholder="Your answer"
        required
      ></textarea>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Answer
      </button>
    </form>
  );
};

export default AnswerForm;