// src/pages/AskQuestion.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AskQuestion = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    tags: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/questions", {
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim())
      });
      navigate(`/question/${res.data?.message?._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error posting question");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Ask a Question</h2>
      {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Question Title"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="desc"
          placeholder="Question Description"
          className="w-full border px-3 py-2 rounded"
          rows="5"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
