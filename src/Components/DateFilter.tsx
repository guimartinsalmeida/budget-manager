import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BudgetItem } from '../types/BudgetItem';

interface DateFilterProps {
  data: BudgetItem[] | null;
}
function DateFilter({ data } : DateFilterProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [filteredItems, setFilteredItems] = useState<BudgetItem[]>([]);

  useEffect(() => {
    if (startDate && endDate && data) {
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.Data);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });

      const total = filteredData.reduce((acc, curr) => acc + parseFloat(curr.Custo), 0);
      setFilteredTotal(total);
      setFilteredItems(filteredData);
    } else {
      setFilteredTotal(0);
      setFilteredItems([]);
    }
  }, [startDate, endDate, data]);

 
  return (
    <div className="date-filter">
      <div className="date-inputs">
        <div>
          <label htmlFor="start-date">Data Início:</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker"
          />
        </div>
        <div>
          <label htmlFor="end-date">Data Final:</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker"
          />
        </div>
      </div>
      <p>Total de custos no período: R$ {filteredTotal.toFixed(2)}</p>
      <div>
        <p>Custos no período:</p>
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>
              <strong>{item.Compra}</strong>: R$ {item.Custo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DateFilter;
