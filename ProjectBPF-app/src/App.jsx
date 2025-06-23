import "./assets/tailwind.css";
import { Routes, Route} from "react-router-dom";

import MainLayout from './layouts/MainLayoutAdmin';
import DashboardAdmin from './pages/DashboardAdmin';

function App() {
  return (
    <Routes>
        {/* Main Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardAdmin />} />
          {/* <Route path="/crudprogram" element={<DashboardAdmin />} />
          <Route path="/crudartikel" element={<DashboardAdmin />} />
          <Route path="/crudfaq" element={<DashboardAdmin />} /> */}
        </Route>
    </Routes>
  )
}

export default App
