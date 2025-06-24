import { Outlet } from "react-router-dom";
// Path disesuaikan dengan struktur folder Anda
import Header from "../component/DashboardGuest/Header"; 
import Footer from "../component/DashboardGuest/Footer";

export default function MainLayoutGuest(){
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            
            <Header />

            <main className="flex-1 p-4 overflow-y-auto">
                <Outlet /> 
            </main>

            <Footer />
            
        </div>
    );
}