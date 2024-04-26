import React, { useState, useEffect } from "react";
import useTriviaCategories from "./hooks/useTriviaCategories";
import useTriviaQuestion from "./hooks/useTriviaQuestion";
import { generateQuery, handleAmountLimit } from "./utils/utils";
import QuestionList from "./components/QuestionList";

export default function App() {
  const categories = useTriviaCategories();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [clickable, setClickable] = useState(true);

  const generateQueryString = generateQuery(
    amount,
    selectedCategory,
    difficulty,
    type
  );

  const { data, fetchData } = useTriviaQuestion(generateQueryString);

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerate = () => {
    fetchData(generateQueryString);
    setClickable(false);

    setTimeout(() => {
      setClickable(true); // Enable the button after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  return (
    <div>
      <div className="bg-gray-500 p-2 flex gap-2 flex-wrap w-full items-center">
        <select
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        >
          {[...Array(50).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">Any Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
        <button
          className={`px-3 py-1 ${
            clickable
              ? " bg-gray-700 text-white"
              : "bg-gray-600 text-white cursor-not-allowed"
          }`}
          onClick={handleGenerate}
          disabled={!clickable}
        >
          {clickable ? "Generate" : "Wait ..."}
        </button>
      </div>

      {data === 5 ? (
        <h1 className="p-3 font-bold">
          Too Many Generate.Please wait a second and click generate again
        </h1>
      ) : (
        <QuestionList
          data={data}
          loading={loading}
          onAnswerStarted={() => setClickable(false)}
          onCheckAnswered={() => setClickable(true)}
        />
      )}
    </div>
  );
}
