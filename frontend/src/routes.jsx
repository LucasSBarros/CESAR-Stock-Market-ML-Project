import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScheduleFormPage from "./pages/ShareFormPage.jsx";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ScheduleFormPage />} path="/" />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
