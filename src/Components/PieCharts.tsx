import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BudgetItem } from '../types/BudgetItem';

ChartJS.register(ArcElement, Tooltip, Legend);
interface dataProps {
  data: BudgetItem[] | null
}
function PieCharts({ data } : dataProps) {
  const colors = [
    '#173C2F', 
    '#396656', 
    '#ABE6D1', 
    '#699183', 
    '#AAE6E5', 
    '#ACE6AA', 
  ];
  const categoriaCustoMap: {[key: string] : string } = {};

  data?.forEach((item) => {
    if (categoriaCustoMap[item.Categoria]) {
      categoriaCustoMap[item.Categoria] += item.Custo;
    } else {
      categoriaCustoMap[item.Categoria] = item.Custo;
    }
  });

  const categorias = data?.map((item) => item.Categoria);
  const filterCategorias = categorias?.filter((item, index) => categorias.indexOf(item) === index);

  const custos = filterCategorias?.map((categoria) => categoriaCustoMap[categoria]);



  const chartData = {
    labels: filterCategorias,
    datasets: [
      {
        data: custos,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };
  return (
    <div className='w-96 h-96'>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default PieCharts;
