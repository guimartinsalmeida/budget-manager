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
    if (item.Categoria && item.Custo) {
      if (categoriaCustoMap[item.Categoria]) {
        categoriaCustoMap[item.Categoria] = (parseFloat(categoriaCustoMap[item.Categoria]) + parseFloat(item.Custo)).toString();
      } else {
        categoriaCustoMap[item.Categoria] = item.Custo;
      }
    }
  });
  const categorias = data?.map((item) => item.Categoria).filter((categoria): categoria is string => categoria !== null);
  const filterCategorias = categorias ? Array.from(new Set(categorias)) : [];
  
  const custos = filterCategorias.map((categoria) => parseFloat(categoriaCustoMap[categoria] || '0'));
  


  const nochartData = {
    labels: ['Sem Compras Registradas'],
    datasets: [
      {
        data: [1],
        backgroundColor: ['gray'],
        hoverBackgroundColor: ['gray'],
      },
    ],
  };


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

  console.log('data comming from pie chart ', data)
  return (
    <div className='w-96 h-96'>
      {
        data?.length === 0 ? (
          <Doughnut data={nochartData} options={options} />
        )
         : (
          <Doughnut data={chartData} options={options} />
         )  
      }
      
    </div>
  );
}

export default PieCharts;
