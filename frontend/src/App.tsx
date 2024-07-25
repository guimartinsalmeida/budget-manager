import { useState, useEffect } from "react";
import { loadBudgetData } from "./utils/LoadBudgetData";
import "./App.css";
import PieCharts from "./Components/PieCharts";
import DateFilter from "./Components/DateFilter";
import { BudgetItem } from "./types/BudgetItem";
import BudgetTable from "./Components/BudgetTable";

function App() {
  const [data, setData] = useState<BudgetItem[] | null>(null);
  const fetchData = async () => {
    const response = await loadBudgetData();
    setData(response);
  };

  const handleDelete = (deletedItemIdNumber: number) => {
    if (data) {
      setData(data.filter(item => item.id !== deletedItemIdNumber));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-around items-center h-screen flex-col">
        <div className="flex flex-col justify-center md:flex-row items-center w-full">
          <div className="w-full md:w-1/2 h-full">
            <DateFilter data={data} />
          </div>
          <div className="flex justify-center w-full md:w-1/2">
            <PieCharts data={data} />
          </div>
        </div>
        <div className="w-full">
          <BudgetTable data={data} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}

export default App;
