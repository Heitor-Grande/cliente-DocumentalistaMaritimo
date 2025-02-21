import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/publicPage/publicPage";
import PublicPage from "./pages/publicPage/publicPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
