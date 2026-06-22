"use client";
import DashboardSideBar from "@/components/dashboard/DashboardSidebar";
import Footer from "@/components/shared/Footer";
const DashboardLayout = ({ children }) => {

    return (
        <div className="min-h-screen">
            <div className="flex">
                <aside className="w-64 h-screen border-r border-gray-200">
                    <DashboardSideBar />
                </aside>
                
                <main className="px-6 py-10 max-w-5xl w-full">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};
// /dashboard/organizer 
export default DashboardLayout;