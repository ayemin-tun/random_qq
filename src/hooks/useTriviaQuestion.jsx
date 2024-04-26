import React, { useEffect, useState } from "react";
import { fetchQuestion } from "../api/api";

const useTriviaQuestion = (query) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetchQuestion(query);
    setData(response);
  };
  return {
    data,
    fetchData,
  };
};

export default useTriviaQuestion;
