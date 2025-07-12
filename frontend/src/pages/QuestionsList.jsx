import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/questions");
        setQuestions(res.data.message);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">All Questions</h2>
      {questions.length > 0 ? (
        questions.map((q) => <QuestionCard key={q._id} question={q} />)
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};

export default QuestionsList;