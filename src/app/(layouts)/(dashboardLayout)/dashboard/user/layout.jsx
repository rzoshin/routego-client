import { roleValidator } from "@/lib/api/session";

const UserDashboardLayout = async ({ children }) => {
  await roleValidator("user");
  return children;
};

export default UserDashboardLayout;
