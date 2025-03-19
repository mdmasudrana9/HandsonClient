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
        {/* Header */}
        <header className="bg-[#1E2935] text-white z-50">
          <div className="container pl-5  py-6">
            <h1 className="text-2xl font-bold">HandsOn Dashboard</h1>
            <p className="mt-2 text-sm">
              Making a difference in your community, one helping hand at a time
            </p>
          </div>
        </header>

        {/* Page Content */}
        <main className="">
          <div className=" ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
