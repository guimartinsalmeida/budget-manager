import { BudgetItem } from "../types/BudgetItem";

export const DeleteBudgetRow = async(item: BudgetItem)=>{
  const queryParams = new URLSearchParams({
    limit: "10",
    query_type: "and",
    Compra: item.Compra,
    Categoria: item.Categoria,
    Data: item.Data,
    Custo: item.Custo.toString(),
  });
  const url =
      "https://sheet2api.com/v1/hHc1XeB4SEea/planilha-sem-titulo/P%C3%A1gina1?" +
      queryParams;
      try {
     await fetch(url, { method: "DELETE" });    
      } catch (error) {
        console.log(error);
      }
}