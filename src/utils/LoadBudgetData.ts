export const loadBudgetData = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error fetching data", error);
    throw error;
  }
};