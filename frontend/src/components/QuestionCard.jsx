import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  return (
    <Link to={`/questions/${question._id}`}>
      <div className="border p-4 rounded shadow hover:bg-gray-50 transition">
        <h3 className="text-lg font-semibold">{question.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{question.desc}</p>
        <div className="text-xs text-gray-500 mt-1">
          Tags: {question.tags?.join(", ")} | Votes: {question.votes}
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;

