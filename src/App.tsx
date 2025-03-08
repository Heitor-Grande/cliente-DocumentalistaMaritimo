import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/publicPage/publicPage";
import PublicPage from "./pages/publicPage/publicPage";
import MenuPage from "./pages/menuPage/menu";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
