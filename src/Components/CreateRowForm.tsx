import { useFormik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import { CreateBudgetRow } from '../utils/CreateBudgetRow';
import { UpdateBudgetRow } from '../utils/UpdateBudgetRow';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { loadBudgetData } from '../utils/LoadBudgetData';
function CreateRowForm() {
  const navigate = useNavigate();
  const { status, id } = useParams();
  const randomId = Math.floor(Math.random() * 1000);
  
  const today = new Date().toISOString().split('T')[0];
  
  const formik = useFormik({
    initialValues: {
      id: Number(randomId),
      Compra: '',
      Categoria: '',
      Custo: '',
      Data: today,
    },
    onSubmit: async values => {
      try {
        if (status === 'create') {
           CreateBudgetRow(values);
         } else {
           UpdateBudgetRow(values, Number(id));
         }
         loadBudgetData()
         navigate('/')
      } catch (error) {
        console.log('Erro in form submision', error)
      }
    }
  });
  return (
    <div className='flex justify-center items-center h-screen'>
      <form 
        onSubmit={formik.handleSubmit}
        className="rounded-lg shadow-md w-full max-w-md"
      >
        {status === "update" ? <h1>Edite a Coluna</h1> : <h1>Crie uma nova coluna</h1>}
        
        <div className="mb-4">
          <label htmlFor="Compra" className="block text-white">Compra</label>
          <input
            id="Compra"
            name="Compra"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.Compra}
            placeholder={'Que Produto ?'}
            className="text-black block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Categoria" className="block text-white">Categoria</label>
          <input
            id="Categoria"
            name="Categoria"
            type="text"
            onChange={formik.handleChange}
            placeholder={'Categoria de Produto'}
            value={formik.values.Categoria}
            className="mt-1 text-black block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Custo" className="block text-white">Custo</label>
          <input
            id="Custo"
            name="Custo"
            type="text"
            onChange={formik.handleChange}
            placeholder={'Custo Produto'}
            value={formik.values.Custo}
            className="mt-1 block w-full text-black px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Data" className="block text-white">Data</label>
          <DatePicker
            id="Data"
            name="Data"
            onChange={date => formik.setFieldValue('Data', date?.toLocaleDateString())}            
            value={formik.values.Data}
            dateFormat="yyyy-MM-dd"
            className="mt-1 block w-full text-black px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button 
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default CreateRowForm;
