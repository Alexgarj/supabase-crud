import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import UserListPage from "./pages/UserListPage";
import CreateUserPage from "./pages/CreateUserPage";
import EditUserPage from "./pages/EditUserPage";
import UserDeletePage from "./pages/UserDeletePage";
import CargosPage from "./pages/CargosPage";
import HorariosPage from "./pages/HorariosPage";
import TickeosPage from "./pages/TickeosPage";
import './App.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="users" element={<UserListPage/>}/>
        <Route path="users/create" element={<CreateUserPage/>}/>
        <Route path="users/edit/:id" element={<EditUserPage/>}/>
        <Route path="users/delete/:id" element={<UserDeletePage/>}/>
        <Route path="/cargos" element={<CargosPage />} />
        <Route path="/horarios" element={<HorariosPage />} />
        <Route path="/tickeos" element={<TickeosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;