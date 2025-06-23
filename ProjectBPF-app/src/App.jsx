import "./assets/tailwind.css";
import { Routes, Route} from "react-router-dom";

import MainLayout from './layouts/MainLayoutAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import Program from "./component/DashboardAdmin/Program";

function App() {
  return (
    <Routes>
        {/* Main Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardAdmin />} />
          <Route path="/crudprogram" element={<Program />} />
        </Route>
    </Routes>
  )
}

export default App
