import { Route, Routes } from "react-router"
import TodosPage from "./pages/TodosPage"
import TodoDetails from "./pages/TodoDetails"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="todo">
          <Route index element={<TodosPage/>}/>
          <Route path=":todoId" element={<TodoDetails/>}/>
        </Route>
        
      </Routes>
    </>
  )
}

export default App
