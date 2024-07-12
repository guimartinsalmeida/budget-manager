export const loadBudgetData = async () =>{
  const url =
      "https://sheet2api.com/v1/hHc1XeB4SEea/planilha-sem-titulo/P%C3%A1gina1?";
      try {
        const response = await fetch(url);
        const result = await response.json();
        return result
      } catch (error) {
        console.log("Error fetching data", error);
      }
}   