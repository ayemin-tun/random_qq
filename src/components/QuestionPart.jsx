import React from "react";
import { decodeHTMLEntities, difficultyColor } from "../utils/utils";

const QuestionPart = ({ question, index }) => {
  return (
    <>
      {" "}
      <div className="flex gap-2 mb-3">
        Question: {index + 1}
        <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded-md">
          {question.category}
        </span>
        <span
          className={`px-2 py-1 ${difficultyColor(
            question.difficulty
          )} text-white text-xs rounded-md`}
        >
          {question.difficulty}
        </span>
      </div>
      <p className="font-semibold text-lg">
        {decodeHTMLEntities(question.question)}
      </p>
    </>
  );
};

export default QuestionPart;
