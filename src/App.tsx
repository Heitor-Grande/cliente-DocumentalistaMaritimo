import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/publicPage/publicPage";
import PublicPage from "./pages/publicPage/publicPage";
import MenuPage from "./pages/menuPage/menu";
import MenuAdministrativoPage from "./pages/menuPage/menuAdministrativo";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/admin" element={<MenuAdministrativoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
