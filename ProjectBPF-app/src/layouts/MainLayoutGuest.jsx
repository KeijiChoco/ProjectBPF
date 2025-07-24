import { Outlet } from "react-router-dom";
import Header from "../components/DashboardGuest/Header";
import Footer from "../components/DashboardGuest/Footer";

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