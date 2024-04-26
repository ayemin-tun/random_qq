import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api/api";

const useTriviaCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCategories();
      setCategories(response);
    };
    fetchData();
  }, []);

  return categories;
};

export default useTriviaCategories;
