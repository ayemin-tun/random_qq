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
  const generateQueryString = generateQuery(
    amount,
    selectedCategory,
    difficulty,
    type
  );
  const { data, fetchData } = useTriviaQuestion(generateQueryString);

  fetchData();
  const handleGenerate = () => {
    setLoading(true);
    const query = generateQueryString;
    fetchData(query);
    setLoading(false);
  };

  const handleAmountChange = (event) => {
    const inputAmount = handleAmountLimit(event.target.value);
    setAmount(inputAmount);
  };

  return (
    <div>
      <div className="bg-gray-500 p-2 flex gap-2 flex-wrap w-full">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="1"
          max="50"
        />

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
          className="px-3 py-1 bg-gray-700 text-white"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>

      <QuestionList data={data} loading={loading} />
    </div>
  );
}
