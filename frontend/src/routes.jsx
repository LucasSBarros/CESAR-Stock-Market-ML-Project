// routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShareFormPage from "./pages/ShareFormPage.jsx";
import PredictionPage from "./pages/PredictionPage.jsx";
import Navbar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";

const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<ShareFormPage />} path="/stock-market-prediction" />
      <Route element={<PredictionPage />} path="/prediction-results" />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
