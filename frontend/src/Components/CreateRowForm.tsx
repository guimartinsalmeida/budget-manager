import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { CreateBudgetRow } from "../utils/CreateBudgetRow";
import { UpdateBudgetRow } from "../utils/UpdateBudgetRow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadBudgetData } from "../utils/LoadBudgetData";
import { useState } from "react";

function CreateRowForm() {
  const navigate = useNavigate();
  const { status, id } = useParams();
  const [showSpinner, setShowSpinner] = useState(false);
  const randomId = Math.floor(Math.random() * 1000);

  const today = new Date().toISOString().split("T")[0];
  
  const formik = useFormik({
    initialValues: {
      id: Number(randomId),
      Compra: "",
      Categoria: "",
      Custo: "",
      Data: today,
    },
    onSubmit: async (values) => {
      try {
        setShowSpinner(true)
        if (status === "create") {
          await CreateBudgetRow(values)
        } else {
          await UpdateBudgetRow(values, Number(id));
        }
       
        loadBudgetData();
        navigate("/");
      } catch (error) {
        console.log("Erro in form submision", error);
      } finally{
        setShowSpinner(false)
      }
    },
  });
  



  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          {status === "update" ? "Edite a Coluna" : "Crie uma nova coluna"}
        </h1>

        <div className="mb-4">
          <label htmlFor="Compra" className="block text-gray-700 font-medium">
            Compra
          </label>
          <input
            id="Compra"
            name="Compra"
            type="text"
            onChange={formik.handleChange}
            required
            value={formik.values.Compra}
            placeholder="Que Produto?"
            className="mt-1 block w-full px-3 py-2 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Categoria"
            className="block text-gray-700 font-medium"
          >
            Categoria
          </label>
          <input
            id="Categoria"
            name="Categoria"
            type="text"
            required
            onChange={formik.handleChange}
            value={formik.values.Categoria}
            placeholder="Categoria de Produto"
            className="mt-1 block w-full px-3 text-white py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Custo" className="block text-gray-700 font-medium">
            Custo
          </label>
          <input
            id="Custo"
            name="Custo"
            type="number"
            required
            onChange={formik.handleChange}
            value={formik.values.Custo}
            placeholder="Custo Produto"
            className="mt-1 block w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Data" className="block text-gray-700 font-medium">
            Data
          </label>
          <DatePicker
            id="Data"
            name="Data"
            onChange={(date) =>
              formik.setFieldValue("Data", date?.toLocaleDateString())
            }
            value={formik.values.Data}
            required
            dateFormat="yyyy-MM-dd"
            className="mt-1 block w-full px-3 py-2 border  text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {!showSpinner ? (
          <button
            type="submit"
            disabled={!(formik.values.Compra.trim().length > 0 &&
              formik.values.Categoria.trim().length > 0 &&
              formik.values.Custo &&
              formik.values.Data.length > 0)}
            className="w-full py-2 px-4  bg-green-600 text-white font-semibold rounded-md disabled:cursor-not-allowed disabled:bg-gray-400 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Enviar
          </button>
        ) : (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
         
        )}
      </form>
    </div>
  );
}

export default CreateRowForm;
