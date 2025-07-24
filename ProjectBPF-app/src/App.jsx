// src/App.jsx

import "./assets/tailwind.css";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayoutAdmin from './layouts/MainLayoutAdmin';
import MainLayoutGuest from './layouts/MainLayoutGuest';

// Protector
import AdminRoute from './components/AdminRoute';

// Admin Pages
import DashboardAdmin from './pages/Admin/DashboardAdmin';
import Program from "./pages/Admin/Program";
import Artikel from "./pages/Admin/Artikel";
import Faq from "./pages/Admin/Faq";
import AboutUs from "./pages/Admin/AboutUs";
import Users from "./pages/Admin/Users"; // <-- Impor halaman Users

// Guest Pages
import HomePageGuest from './pages/Guest/HomePageGuest';
import ProgramPage from './pages/Guest/ProgramPage';
import FaqPage from './pages/Guest/FAQPage';
import ArtikelPage from "./pages/Guest/ArtikelPage";
import AboutUsPage from "./pages/Guest/AboutUsPage";

// Auth Page (jika diperlukan nanti)
// import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      {/* Rute Guest (Publik) */}
      <Route path="/guest" element={<MainLayoutGuest />}>
        <Route index element={<HomePageGuest />} />
        <Route path="program" element={<ProgramPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="artikel" element={<ArtikelPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
      </Route>

      {/* Rute Admin yang Dilindungi (atau dibypass) */}
      <Route element={<AdminRoute />}>
        <Route element={<MainLayoutAdmin />}>
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route path="/crudprogram" element={<Program />} />
          <Route path="/crudartikel" element={<Artikel />} />
          <Route path="/crudfaq" element={<Faq />} />
          <Route path="/crudaboutus" element={<AboutUs />} />
          <Route path="/crudusers" element={<Users />} /> {/* <-- Tambahkan rute untuk Users */}
        </Route>
      </Route>

      {/* Rute Default, alihkan ke halaman guest */}
      <Route path="/" element={<Navigate to="/guest" replace />} />
    </Routes>
  );
}

export default App;
