import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnswerForm from "../components/AnswerForm";

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`/questions/${id}`);
        setQuestion(res.data.message);
      } catch (err) {
        console.error("Error fetching question", err);
      }
    };
    fetchQuestion();
  }, [id]);

  if (!question) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
      <p className="text-gray-700 mb-2">{question.desc}</p>
      <div className="text-sm text-gray-500 mb-4">Tags: {question.tags.join(", ")}</div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Answers:</h3>
        {question.answers.length === 0 ? (
          <p className="text-sm text-gray-600">No answers yet.</p>
        ) : (
          question.answers.map((a) => (
            <div key={a._id} className="border p-2 rounded mb-2">
              <div className="text-sm">{a.answerData}</div>
              <div className="text-xs text-gray-500">Votes: {a.votes}</div>
            </div>
          ))
        )}
      </div>

      <AnswerForm questionId={id} setQuestion={setQuestion} />
    </div>
  );
};

export default QuestionDetails;
