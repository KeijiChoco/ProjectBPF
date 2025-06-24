import { Outlet } from "react-router-dom";
// Path ini mungkin perlu Anda sesuaikan lagi jika berbeda
import Header from "../component/DashboardGuest/Header";
import Footer from "../component/DashboardGuest/Footer";

export default function MainLayoutGuest(){
    return (
        <div className="min-h-screen flex flex-col">
            
            <Header />

            {/* Tambahkan padding-top di sini untuk memberi ruang bagi header */}
            <main className="flex-1 p-4 pt-28"> {/* <-- UBAH DI SINI */}
                <Outlet /> 
            </main>

            <Footer />
            
        </div>
    );
}