import { roleValidator } from "@/lib/api/session";

const VendorDashboardLayout = async ({ children }) => {
  await roleValidator("vendor");
  return children;
};

export default VendorDashboardLayout;
