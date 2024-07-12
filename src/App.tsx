import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {loadBudgetData} from './utils/LoadBudgetData'
import "./App.css";
import { DeleteBudgetRow } from "./utils/DeleteBudgetRow";
import PieCharts from "./Components/PieCharts";
import DateFilter from "./Components/DateFilter";
import { BudgetItem } from "./types/BudgetItem";
import Edit from './assets/image-removebg-preview.png'
import Trash from './assets/cesto-de-lixo.png'

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
    
    <div className="w-1/2 h-full">
    <DateFilter data={data} />
    </div>
    <div className="flex justify-center w-1/2">
        <PieCharts data={data}/>
    </div>
    </div>
    
      <div className="w-full flex justify-center">
        {data ? (
          <table className="w-4/5 font-bold text-left border border-gray-200 divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Compra</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Custo</th>
              <th className="p-2">Data</th>
              <th className="p-2">Editar</th>
              <th className="p-2">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="hover:bg-custom-green-hover">
                <td className="p-2">{item.Compra}</td>
                <td className="p-2">{item.Categoria}</td>
                <td className="p-2">{item.Custo}</td>
                <td className="p-2">{item.Data}</td>
                <td className="p-2">
                  <button className="bg-custom-green border border-custom-border-green text-white py-1 px-2 rounded-md" onClick={() => navigate(`/form/update/${item.id}`)}>
                    <img src={Edit} alt="Edit Icon" className="max-w-none w-6 h-6" />
                  </button>
                </td>
                <td className="p-2">
                  <button className="bg-custom-red border border-custom-border-red text-white py-1 px-2 rounded-md" onClick={() => deleteRow(item)}>
                    <img src={Trash} alt="Trash Can" className="max-w-none w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} className="p-2">
                <button onClick={() => navigate('/form/create')} className="bg-custom-green-opaque-clear hover:bg-custom-green-hover-opaque-clear border text-white font-bold py-2 px-4 rounded">
                  Add Compra
                </button>
              </td>
            </tr>
          </tfoot>
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
