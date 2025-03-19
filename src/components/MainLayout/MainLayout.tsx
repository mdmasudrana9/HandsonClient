import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-16 bg-white shadow-md flex items-center px-6">
          <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className=" ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
