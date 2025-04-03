import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/publicPage/publicPage";
import PublicPage from "./pages/publicPage/publicPage";
import MenuPage from "./pages/menuPage/menu";
import MenuAdministrativoPage from "./pages/menuPage/menuAdministrativo";
import RecSenhaUser from "./pages/recSenhaUser/recSenhaUser";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/admin" element={<MenuAdministrativoPage />} />
        <Route path="/menu/rec/senha/user" element={<RecSenhaUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
