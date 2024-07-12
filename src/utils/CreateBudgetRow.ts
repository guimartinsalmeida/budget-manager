import { BudgetItem } from "../types/BudgetItem";
const apiUrl = import.meta.env.VITE_API_URL;

export const CreateBudgetRow = async ( values: BudgetItem ) =>{
const bodyValues = JSON.stringify(values)
const url = apiUrl;

const sendNewRow = async () =>{

  try {
  await fetch(url, {method: 'POST', headers: {
    'Content-Type': 'application/json',
  }, body: bodyValues})
  } catch (error) {
    console.log(error)
  }

}

sendNewRow()

}