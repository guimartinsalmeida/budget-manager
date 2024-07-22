import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App'
import CreateRowForm from "./Components/CreateRowForm";



function MainRoutes(){
  return(
    <Router>
      <Routes>
        <Route path="/"element={<App/>}></Route>
        <Route path="/form/:status/:id"element={<CreateRowForm/>}></Route>
        <Route path="/form/:status"element={<CreateRowForm/>}></Route>
      </Routes>
    </Router>
  )
}
export default MainRoutes