import "./assets/tailwind.css";
import { Routes, Route} from "react-router-dom";

import MainLayoutAdmin from './layouts/MainLayoutAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import Program from "./component/DashboardAdmin/Program";
import Artikel from "./component/DashboardAdmin/Artikel";
import Faq from "./component/DashboardAdmin/Faq";
import AboutUs from "./component/DashboardAdmin/AboutUs";

function App() {
  return (
    <Routes>
        {/* Main Routes */}
        <Route element={<MainLayoutAdmin />}>
          <Route path="/" element={<DashboardAdmin />} />
          <Route path="/crudprogram" element={<Program />} />
          <Route path="/crudartikel" element={<Artikel />} />
          <Route path="/crudfaq" element={<Faq />} />
          <Route path="/crudaboutus" element={<AboutUs />} />
        </Route>
    </Routes>
  )
}

export default App
