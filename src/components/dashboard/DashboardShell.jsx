"use client";

import DashboardSideBar from "@/components/dashboard/DashboardSidebar";
import Footer from "@/components/shared/Footer";

const DashboardShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <DashboardSideBar />
        <main className="w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardShell;
