// src/layouts/MainLayoutAdmin.jsx

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";

export default function MainLayoutAdmin(){
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar akan menempel di kiri dan tidak akan scroll */}
            <Sidebar />

            {/* Kontainer untuk sisi kanan (Header + Konten) */}
            <div className="flex-1 flex flex-col">
                {/* Header akan menempel di atas dan tidak akan scroll */}
                <Header />

                {/* Kontainer ini akan menjadi area yang bisa di-scroll */}
                <div className="flex-1 overflow-y-auto">
                    <main className="p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
      );
}
