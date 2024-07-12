import { BudgetItem } from "../types/BudgetItem";

export const CreateBudgetRow = async ( values: BudgetItem ) =>{
const bodyValues = JSON.stringify(values)
const url = 'https://sheet2api.com/v1/hHc1XeB4SEea/planilha-sem-titulo/P%C3%A1gina1';

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