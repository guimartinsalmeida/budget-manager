import { useNavigate } from "react-router-dom";
import Edit from '../assets/image-removebg-preview.png' 
import Trash from '../assets/cesto-de-lixo.png'
import { DeleteBudgetRow } from "../utils/DeleteBudgetRow";
import { BudgetItem } from "../types/BudgetItem";
interface dataProps {
  data: BudgetItem[] | null
  onDelete: (item: number) => void;
}

function BudgetTable({data, onDelete}: dataProps) {
  const navigate = useNavigate()

  const deleteRow = (item: BudgetItem) => {
    DeleteBudgetRow(item);
    onDelete(item.id);
  };


  return (
    <div>
      <div className="w-full mt-4 md:mt-0 flex justify-center flex-col items-center">
        {data ? (
          <><div className="w-11/12 md:w-4/5 max-h-96 overflow-y-auto">
              <table className="w-full font-bold text-left border border-gray-200 divide-y divide-gray-200 ">
                <thead className="sticky top-0">
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
                  {data.length === 0 ? (<p>sem dados para mostrar</p>): data?.map((item, index) => (
                    <tr key={index} className="hover:bg-custom-green-hover">
                      <td className="p-2">{item?.Compra}</td>
                      <td className="p-2">{item?.Categoria}</td>
                      <td className="p-2">{item?.Custo}</td>
                      <td className="p-2">{item?.Data}</td>
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
                  {}
                </tbody>

              </table>
            </div>
            <div className="w-4/5">
                <div className="w-full flex">
                  <div className="p-2">
                    <button onClick={() => navigate('/form/create')} className="bg-custom-green-opaque-clear hover:bg-custom-green-hover-opaque-clear border text-white font-bold py-2 px-4 rounded">
                      Add Compra
                    </button>
                  </div>
                </div>
              </div></>
        
        ) : (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BudgetTable
