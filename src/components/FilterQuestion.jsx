import React, { useState } from "react";
import useTriviaCategories from "../hooks/useTriviaCategories";
import { generateQuery } from "../utils/utils";

const FilterQuestion = ({ fetchData }) => {
  const categories = useTriviaCategories();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState(10); // Default amount set to 10
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  const handleGenerate = () => {
    const query = generateQueryString(); // Call generateQueryString to get the current query
    fetchData(query); // Call fetchData with the generated query
  };

  const handleAmountChange = (event) => {
    const inputAmount = parseInt(event.target.value);
    if (inputAmount <= 50) {
      setAmount(inputAmount);
    } else {
      alert("Please enter a number between 1 and 50.");
      setAmount(10);
    }
  };

  const generateQueryString = () => {
    return generateQuery(amount, selectedCategory, difficulty, type);
  };

  return (
    <div>
      <div className="bg-gray-500 p-2 flex gap-2">
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
      </div>

      <button
        className="px-3 py-1 bg-gray-700 text-white"
        onClick={handleGenerate}
      >
        Generate
      </button>
    </div>
  );
};

export default FilterQuestion;
