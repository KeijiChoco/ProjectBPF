// File: src/App.jsx

import "./assets/tailwind.css";
import { Routes, Route} from "react-router-dom";

// Admin imports
import MainLayoutAdmin from './layouts/MainLayoutAdmin';
import DashboardAdmin from './pages/DashboardAdmin';

// Guest imports
import MainLayoutGuest from './layouts/MainLayoutGuest'; // <-- 1. Import layout guest
import HomePageGuest from './pages/HomePageGuest';       // <-- 2. Import halaman untuk guest

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route element={<MainLayoutAdmin />}>
        <Route path="/" element={<DashboardAdmin />} />
        {/* <Route path="/crudprogram" element={<DashboardAdmin />} />
        <Route path="/crudartikel" element={<DashboardAdmin />} />
        <Route path="/crudfaq" element={<DashboardAdmin />} /> */}
      </Route>

      {/* Guest Routes */}
      {/* 3. Gunakan MainLayoutGuest untuk membungkus halaman guest */}
      <Route element={<MainLayoutGuest />}>
        <Route path="/guest" element={<HomePageGuest />} />
        {/* Anda bisa menambahkan rute guest lain di sini, misal:
        <Route path="/guest/about" element={<AboutPage />} /> 
        */}
      </Route>
    </Routes>
  )
}

export default App;