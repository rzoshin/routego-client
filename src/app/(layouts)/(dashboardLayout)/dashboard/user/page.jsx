import { Suspense } from "react";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ProfileCard from "@/components/dashboard/ProfileCard";
import ProfileStats from "@/components/dashboard/ProfileStats";
import { getUser } from "@/lib/api/session";
import { getUserProfile, getUserStats } from "@/lib/api/users/data";

const UserProfile = async () => {
  const user = await getUser();
  const [profileResult, statsResult] = await Promise.all([
    getUserProfile(user.email),
    getUserStats(user.email),
  ]);

  const profile = profileResult?.message ? null : profileResult;
  const stats = statsResult?.message ? null : statsResult;

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="My Profile"
        description="Your RouteGo account information and booking summary."
      />

      <Suspense
        fallback={
          <div className="flex justify-center py-10">
            Loading...
          </div>
        }
      >
        <ProfileCard user={user} profile={profile} />
        <ProfileStats stats={stats} />
      </Suspense>
    </div>
  );
};

export default UserProfile;
