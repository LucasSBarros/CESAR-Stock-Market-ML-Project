import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScheduleFormPage from "./pages/shareFormPage.jsx";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ScheduleFormPage />} path="/" />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
