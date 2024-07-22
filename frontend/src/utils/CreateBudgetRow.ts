import { BudgetItem } from "../types/BudgetItem";
const apiUrl = import.meta.env.VITE_API_URL;

export const CreateBudgetRow = async ( values: BudgetItem ) =>{
  try{
  const response = await fetch( apiUrl, {
  method: 'POST',
  headers:{
    'Content-Type': 'application/json',
  },
  body:JSON.stringify(values)
})
if(!response.ok){
  console.log(`Error status: ${response.status}`)
}

return response.json()
  }catch(error){
    console.log(error)
  }

}