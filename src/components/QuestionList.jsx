import React, { memo, useEffect, useMemo, useState } from "react";
import {
  decodeHTMLEntities,
  difficultyColor,
  shuffleArray,
} from "../utils/utils";
import QuestionPart from "./QuestionPart";

const QuestionList = ({ data, loading }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    setSelectedAnswers([]);
    setShowResults(false);
  }, [data]);

  const handleAnswerSelection = (index, answer) => {
    //Check if an answer for this question index already exists in selectedAnswers
    const existingAnswerIndex = selectedAnswers.findIndex(
      (item) => item.index === index
    );

    if (existingAnswerIndex !== -1) {
      // If an answer exists for this index, update the answer
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[existingAnswerIndex].answer = answer;
      setSelectedAnswers(updatedAnswers);
    } else {
      // If no answer exists for this index, add a new answer entry
      setSelectedAnswers((prev) => [
        ...prev,
        {
          index: index,
          answer: answer,
        },
      ]);
    }
  };

  const shuffleAnswerLists = useMemo(() => {
    return data.map((question) => {
      const allAnswers = [
        question.correct_answer,
        ...question.incorrect_answers,
      ];
      return shuffleArray(allAnswers);
    });
  }, [data]);

  const handleCheckAnswers = () => {
    if (selectedAnswers.length === data.length) {
      setShowResults(true);
      console.log(selectedAnswers);
    } else {
      alert(
        "Please answer all question before check answer " +
          (data.length - selectedAnswers.length) +
          " answers required"
      );
    }
  };

  const getAnswerByIndex = (index) => {
    const answerObject = selectedAnswers.find((item) => item.index === index);
    return answerObject ? answerObject.answer : null;
  };

  return (
    <div className="mt-4 flex flex-col justify-center p-3">
      {data.length === 0 && <h1>Loading ...</h1>}

      <ul>
        {data.map((question, index) => {
          const shuffledAnswers = shuffleAnswerLists[index];
          const selectedAnswer = getAnswerByIndex(index);
          return (
            <li key={index} className="w-full p-4 border shadow mb-2">
              <QuestionPart question={question} index={index} />

              {/* Display shuffled answers */}
              <ul>
                {shuffledAnswers.map((answer, answerIndex) => (
                  <li key={answerIndex} className="flex gap-2">
                    <input
                      className="cursor-pointer"
                      type="radio"
                      name={`question-${index}`}
                      value={answer}
                      onChange={() => handleAnswerSelection(index, answer)}
                      checked={selectedAnswer === answer}
                    />
                    {decodeHTMLEntities(answer)}
                    {/* {answer === question.correct_answer ? (
                      <span className="font-extrabold">
                        {decodeHTMLEntities(answer)}
                      </span>
                    ) : (
                      <i>{decodeHTMLEntities(answer)}</i>
                    )} */}
                  </li>
                ))}
              </ul>

              {showResults && (
                <>
                  {getAnswerByIndex(index) != question.correct_answer && (
                    <div className="w-full p-3 bg-red-400 text-white mt-2 rounded font-bold">
                      Not Correct - "Correct Answer: {question.correct_answer}"
                    </div>
                  )}
                  {getAnswerByIndex(index) === question.correct_answer && (
                    <div className="w-full p-3 bg-green-400 text-white mt-2 rounded font-bold">
                      Correct
                    </div>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
      {data.length != 0 && (
        <button
          className="px-3 py-1 bg-gray-800 text-white"
          onClick={handleCheckAnswers}
        >
          Check Answers
        </button>
      )}
    </div>
  );
};

export default memo(QuestionList);
