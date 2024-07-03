import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const url =
      "https://sheet2api.com/v1/hHc1XeB4SEea/planilha-sem-titulo/P%C3%A1gina1?";

    const getData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    getData();
  }, []);

  const deleteRow = (item) => {
    const queryParams = new URLSearchParams({
      limit: "10",
      query_type: "and",
      Compra: item.Compra,
      Categoria: item.Categoria,
      Data: item.Data,
      Custo: item.Custo.toString(),
    });
    const url =
      "https://sheet2api.com/v1/hHc1XeB4SEea/planilha-sem-titulo/P%C3%A1gina1?" +
      queryParams;

    const deleteRowWithData = async () => {
      try {
        const response = await fetch(url, { method: "DELETE" });
        const responseText = response.text();
        console.log(responseText);
        setData(data.filter((d) => d != item));
      } catch (error) {
        console.log(error);
      }
    };

    deleteRowWithData();
  };

  console.log(data);
  return (
    <>
      <div>
        {data ? (
          <table>
            <tr>
              <th>Compra</th>
              <th>Categoria</th>
              <th>Custo</th>
              <th>Data</th>
            </tr>
            {data.map((item, index) => (
              <>
                <tr>
                <td>{item.Compra}</td>
                <td>{item.Categoria}</td>
                <td>{item.Custo}</td>
                <td>{item.Data}</td>
                <button onClick={() => deleteRow(item)}>Delete</button>
                </tr>
                
              </>
            ))}
          </table>
        ) : (
          "Loading"
        )}
      </div>
    </>
  );
}

export default App;
