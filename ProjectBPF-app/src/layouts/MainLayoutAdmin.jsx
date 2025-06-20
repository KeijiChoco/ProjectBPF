import { Outlet } from "react-router-dom";
import Sidebar from "../component/DashboardAdmin/Sidebar";
import Header from "../component/DashboardAdmin/Header";

export default function MainLayoutAdmin(){
    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="flex flex-row flex-1">
                <Sidebar />
                <div className="flex-1 p-4">
                    <Header />

                    <Outlet />
                </div>
            </div>
        </div>
      );
}