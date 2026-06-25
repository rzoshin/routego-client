import { getUser } from "@/lib/api/session";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";

const DashboardLayout = async ({ children }) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
