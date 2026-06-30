import { roleValidator } from "@/lib/api/session";
import { syncUser } from "@/lib/api/users/action";

const VendorDashboardLayout = async ({ children }) => {
  await roleValidator("vendor");
  await syncUser();
  return children;
};

export default VendorDashboardLayout;
