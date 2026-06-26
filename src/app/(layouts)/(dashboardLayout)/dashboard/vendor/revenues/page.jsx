import DashboardHeading from "@/components/dashboard/DashboardHeading";
import VendorRevenueChart from "@/components/dashboard/vendor/VendorRevenueChart";
import { getVendorStats } from "@/lib/api/vendor/data";
import { getUser } from "@/lib/api/session";

const VendorRevenues = async () => {
  const user = await getUser();
  const statsResult = await getVendorStats(user.email);
  const stats = statsResult?.message ? null : statsResult;

  return (
    <div className="space-y-6">
      <DashboardHeading
        title="Revenue Overview"
        description="Track tickets added, tickets sold, and monthly revenue."
      />

      <VendorRevenueChart stats={stats} />
    </div>
  );
};

export default VendorRevenues;
