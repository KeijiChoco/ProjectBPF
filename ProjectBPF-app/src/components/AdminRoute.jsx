import { Outlet } from 'react-router-dom';
// Komponen dan hook di bawah ini tidak kita butuhkan untuk sementara
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

function AdminRoute() {
  // Semua logika pengecekan login dan peran admin kita nonaktifkan sementara
  // dengan mengubahnya menjadi komentar.
  
  // const { profile, loading } = useAuth();
  //
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p>Memuat sesi...</p>
  //     </div>
  //   );
  // }
  //
  // return profile && profile.role === 'admin' ? <Outlet /> : <Navigate to="/login" replace />;


  // Langsung tampilkan halaman yang diminta (<Outlet />) tanpa syarat apa pun.
  return <Outlet />;
}

export default AdminRoute;
