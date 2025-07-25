// src/App.jsx - Guest routes accessible without login

import "./assets/tailwind.css";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayoutAdmin from './layouts/MainLayoutAdmin';
import MainLayoutGuest from './layouts/MainLayoutGuest';

// Protectors & Guards
import AdminRoute from './components/AdminRoute';
import PublicRoute from './components/PublicRoute';
import GuestRoute from './components/GuestRoute';
import AuthCallbackPage from "./pages/AuthCallbackPage";

// Admin Pages
import DashboardAdmin from './pages/Admin/DashboardAdmin';
import Program from "./pages/Admin/Program";
import Artikel from "./pages/Admin/Artikel";
import Faq from "./pages/Admin/Faq";
import AboutUs from "./pages/Admin/AboutUs";
import Users from "./pages/Admin/Users";

// Manager Pages
import InstructorsManager from "./pages/Admin/InstructorsManager";
import SesiManager from "./pages/Admin/SesiManager";
import PendaftaranManager from "./pages/Admin/PendaftaranManager";
import KehadiranManager from "./pages/Admin/KehadiranManager";

// Guest Pages
import HomePageGuest from './pages/Guest/HomePageGuest';
import ProgramPage from './pages/Guest/ProgramPage';
import FaqPage from './pages/Guest/FAQPage';
import ArtikelPage from "./pages/Guest/ArtikelPage";
import AboutUsPage from "./pages/Guest/AboutUsPage";
import ArtikelDetailPage from './components/DashboardGuest/ArtikelDetailPage';
import ProgramDetailPage from './components/DashboardGuest/ProgramDetailPage';

// Auth Pages
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/Auth/UpdatePasswordPage";

function App() {
  return (
    <Routes>
      {/* Auth Routes - Redirect jika sudah login */}
      <Route element={<PublicRoute redirectIfAuthenticated={true} />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
      </Route>

      {/* OAuth Callback */}
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* Public Guest Routes - Bisa diakses tanpa login */}
      <Route element={<PublicRoute redirectIfAuthenticated={false} />}>
        <Route path="/home" element={<MainLayoutGuest />}>
          <Route index element={<HomePageGuest />} />
          <Route path="program" element={<ProgramPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="artikel" element={<ArtikelPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
        </Route>

        \
        {/* Guest Routes with Details - Accessible without login */}
        <Route path="/guest" element={<MainLayoutGuest />}>
          <Route index element={<HomePageGuest />} />
          <Route path="program" element={<ProgramPage />} />
          <Route path="program/:id" element={<ProgramDetailPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="artikel" element={<ArtikelPage />} />
          <Route path="artikel/:id" element={<ArtikelDetailPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
        </Route>
      </Route>

      {/* Admin Routes - Perlu admin role */}
      <Route element={<AdminRoute />}>
        <Route element={<MainLayoutAdmin />}>
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route path="/crudprogram" element={<Program />} />
          <Route path="/crudartikel" element={<Artikel />} />
          <Route path="/crudfaq" element={<Faq />} />
          <Route path="/crudaboutus" element={<AboutUs />} />
          <Route path="/crudusers" element={<Users />} />
          
          {/* Manager Routes */}
          <Route path="/instructors-manager" element={<InstructorsManager />} />
          <Route path="/sesi-manager" element={<SesiManager />} />
          <Route path="/pendaftaran-manager" element={<PendaftaranManager />} />
          <Route path="/kehadiran-manager" element={<KehadiranManager />} />
        </Route>
      </Route>

      {/* Default Routes */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;