import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ProfileCard from "@/components/dashboard/ProfileCard";
import ProfileStats from "@/components/dashboard/ProfileStats";
import FraudBanner from "@/components/dashboard/vendor/FraudBanner";
import VendorQuickLinks from "@/components/dashboard/vendor/VendorQuickLinks";
import { getUser } from "@/lib/api/session";
import { getUserProfile, getUserStats } from "@/lib/api/users/data";

const VendorProfile = async () => {
  const user = await getUser();
  const [profileResult, statsResult] = await Promise.all([
    getUserProfile(user.email),
    getUserStats(user.email),
  ]);

  const profile = profileResult?.message ? null : profileResult;
  const stats = statsResult?.message ? null : statsResult;
  const isFraud = Boolean(profile?.isFraud);

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="Vendor Profile"
        description="Manage your tickets, bookings, and revenue from one place."
      />

      {isFraud ? <FraudBanner /> : null}

      <Suspense
        fallback={
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        }
      >
        <ProfileCard user={user} profile={profile} />
        <ProfileStats stats={stats} />
        <VendorQuickLinks isFraud={isFraud} />
      </Suspense>
    </div>
  );
};

export default VendorProfile;
