// File: src/App.jsx

import "./assets/tailwind.css";
import { Routes, Route} from "react-router-dom";


// Admin imports

import MainLayoutAdmin from './layouts/MainLayoutAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import Program from "./component/DashboardAdmin/Program";
import Artikel from "./component/DashboardAdmin/Artikel";
import Faq from "./component/DashboardAdmin/Faq";
import AboutUs from "./component/DashboardAdmin/AboutUs";

// Guest imports
import MainLayoutGuest from './layouts/MainLayoutGuest'; 
import HomePageGuest from './pages/HomePageGuest';     
import ProgramPage from './pages/ProgramPage';
import FaqPage from './pages/FAQPage';
function App() {
  return (
    <Routes>

      {/* Guest Routes */}
      <Route path="/guest" element={<MainLayoutGuest />}>
        <Route index element={<HomePageGuest />} /> {/* Halaman utama /guest */}
        <Route path="program" element={<ProgramPage />} />
        <Route path="faq" element={<FaqPage />} />
        {/* <Route path="artikel" element={<ArtikelPage />} /> */}
        {/* <Route path="about-us" element={<AboutUsPage />} /> */}
      </Route>

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

export default App;