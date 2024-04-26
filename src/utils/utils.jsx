export const generateQuery = (amount, selectedCategory, difficulty, type) => {
  const amountQueryParam = `amount=${amount}`;
  const categoryQueryParam = selectedCategory
    ? `&category=${selectedCategory}`
    : "";
  const difficultyQueryParam = difficulty ? `&difficulty=${difficulty}` : "";
  const typeQueryParam = type ? `&type=${type}` : "";

  return `${amountQueryParam}${categoryQueryParam}${difficultyQueryParam}${typeQueryParam}`;
};

export const handleAmountLimit = (value) => {
  const inputAmount = parseInt(value);
  if (inputAmount <= 50) {
    return inputAmount;
  } else {
    alert("Please enter a number between 1 and 50.");
    return 10;
  }
};

export const decodeHTMLEntities = (text) => {
  const element = document.createElement("div");
  if (text) {
    element.innerHTML = text;
    return element.innerText;
  }
  return "";
};

export const difficultyColor = (value) => {
  let color = "";
  if (value === "hard") color = "bg-red-500";
  if (value === "medium") color = "bg-orange-500";
  if (value === "easy") color = "bg-green-500";
  return color;
};
