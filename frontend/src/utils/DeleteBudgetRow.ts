import { BudgetItem } from "../types/BudgetItem";

export const DeleteBudgetRow = async(item: BudgetItem)=>{
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(item.id)
  const queryParams = new URLSearchParams({
    limit: "10",
    query_type: "or",
    Id: item.id.toString()
  });
  const url = apiUrl + queryParams;
      try {
     await fetch(url, { method: "DELETE" });    
      } catch (error) {
        console.log(error);
      }
}