import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BudgetItem } from "../types/BudgetItem";
import { MdDateRange } from "react-icons/md";

interface DateFilterProps {
  data: BudgetItem[] | null;
}

function DateFilter({ data }: DateFilterProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [filteredItems, setFilteredItems] = useState<BudgetItem[]>([]);

  useEffect(() => {
    if (startDate && endDate && data) {
      const filteredData = data.filter((item) => {
        const itemDate = new Date(item.Data);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });

      const total = filteredData.reduce(
        (acc, curr) => acc + parseFloat(curr.Custo),
        0
      );
      setFilteredTotal(total);
      setFilteredItems(filteredData);
    } else {
      setFilteredTotal(0);
      setFilteredItems([]);
    }
  }, [startDate, endDate, data]);

  return (
    <div className="date-filter">
      <div className="flex justify-around items-center mb-4">
        <div>
          <label htmlFor="start-date">Data Início:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
        <p className="text-gray-500 mx-2">até</p>

        <MdDateRange className="text-gray-500 h-6 w-6 mx-2" />
        </div>
        <div>
          <label htmlFor="end-date">Data Final:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
      </div>
      {filteredTotal ? (
        <p className="mb-4">Total de custos no período: R$ {filteredTotal.toFixed(2)}</p>
      ) : (
        <p className="mb-4">Custo total:</p>
      )}
      <div className="w-full flex justify-center items-center flex-col">
        <div className="w-full md:w-6/12 border border-gray-200 bg-gray-100 rounded-md p-4">
          {filteredTotal ? (
            filteredItems.map((item, index) => (
              <div key={index} className="mb-2">
                <strong>{item.Compra}</strong>: R$ {item.Custo}
              </div>
            ))
          ) : (
            data?.map((item, index) => (
              <div key={index} className="mb-2">
                <strong>{item.Compra}</strong>: R$ {item.Custo}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DateFilter;
