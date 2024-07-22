import { BudgetItem } from "../types/BudgetItem";

export const UpdateBudgetRow = async (values : BudgetItem, id : number) => {
  const queryParams = new URLSearchParams({
    query_type: "and",
    id: id.toString()
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const data = {
    'id': id.toString(),
    'Compra': values.Compra,
    'Categoria': values.Categoria,
    'Data': values.Data,
    'Custo': values.Custo.toString()
  };

  const url = apiUrl + queryParams;

  try {
   await fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
  } catch (error) {
    console.log(error);
  }
 
};
