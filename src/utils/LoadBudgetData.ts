export const loadBudgetData = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(apiUrl);
    return response.json();
  } catch (error) {
    console.log("Error fetching data", error);
    throw error;
  }

};