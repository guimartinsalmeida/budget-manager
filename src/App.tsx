import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {loadBudgetData} from './utils/LoadBudgetData'
import "./App.css";
import { DeleteBudgetRow } from "./utils/DeleteBudgetRow";
import PieCharts from "./Components/PieCharts";
import DateFilter from "./Components/DateFilter";
import { BudgetItem } from "./types/BudgetItem";

function App() {
  const navigate = useNavigate()
  const [data, setData] = useState<BudgetItem[] | null >(null);
  const fetchData = async () => {
    try {
      const result = await loadBudgetData()
      setData(result);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchData()
  }, []);

  const deleteRow = (item: BudgetItem) => {
    DeleteBudgetRow(item)
   setData((prev) => (prev ? prev.filter( d => d != item) : []))
  };

  return (
    <>
    <div className="flex justify-around items-center h-screen flex-col">
    <div className="flex items-center w-full">
    <div className="w-1/2">
        <PieCharts data={data}/>
    </div>
    <div className="w-1/2">
    <DateFilter data={data} />
    </div>
    </div>
    
      <div className="w-full flex justify-center">
        {data ? (
          <table className="w-4/5">
            <tr>
              <th>Compra</th>
              <th>Categoria</th>
              <th>Custo</th>
              <th>Data</th>
            </tr>
            {data?.map((item, index) => (
              
                <tr key={index}>
                <td>{item.Compra}</td>
                
                <td>{item.Categoria}</td>
                <td>{item.Custo}</td>
                <td>{item.Data}</td>
                <td><button onClick={()=> navigate(`/form/update/${item.id}`)}>Update</button></td>

                  <td><button onClick={()=> deleteRow(item)}>Delete</button></td>
              
                
                </tr>
                
         
            ))}

<button onClick={() => navigate('/form/create')}>Criar nova Row</button>
          </table>
        ) : (
          "Loading"
        )}
      </div>
    </div>
   
    </>
  );
}

export default App;
