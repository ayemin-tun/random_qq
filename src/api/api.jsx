import axios from "./axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("/api_category.php");
    return response.data.trivia_categories;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const fetchQuestion = async (query) => {
  try {
    const response = await axios.get(`/api.php?${query}`);
    return response.data.results;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};
