import { BudgetItem } from "../types/BudgetItem";

export const DeleteBudgetRow = async(item: BudgetItem)=>{
  const apiUrl = import.meta.env.VITE_API_URL;

  const queryParams = new URLSearchParams({
    limit: "10",
    query_type: "and",
    Compra: item.Compra,
    Categoria: item.Categoria,
    Data: item.Data,
    Custo: item.Custo.toString(),
  });
  const url = apiUrl + queryParams;
      try {
     await fetch(url, { method: "DELETE" });    
      } catch (error) {
        console.log(error);
      }
}