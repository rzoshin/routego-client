import { roleValidator } from "@/lib/api/session";

const AdminDashboardLayout = async ({ children }) => {
  await roleValidator("admin");
  return children;
};

export default AdminDashboardLayout;
