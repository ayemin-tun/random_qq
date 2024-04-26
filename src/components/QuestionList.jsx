import React, { memo } from "react";
import { decodeHTMLEntities, difficultyColor } from "../utils/utils";

const QuestionList = ({ data, loading }) => {
  console.log("QuestionList Render");

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  return (
    <div className="mt-4 flex flex-col justify-center p-3">
      {data.length === 0 && <h1>Please click generate to start ...</h1>}
      <ul>
        {data.map((question, index) => {
          // Combine correct and incorrect answers into a single array
          const allAnswers = [
            question.correct_answer,
            ...question.incorrect_answers,
          ];
          // Shuffle the combined answers array
          const shuffledAnswers = shuffleArray(allAnswers);

          return (
            <li key={index} className="w-full p-4 border shadow mb-2">
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

              {/* Display shuffled answers */}
              <ul>
                {shuffledAnswers.map((answer, answerIndex) => (
                  <li key={answerIndex}>{decodeHTMLEntities(answer)}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(QuestionList);
