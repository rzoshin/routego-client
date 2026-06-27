import DashboardHeading from "@/components/dashboard/DashboardHeading";
import AdminQuickLinks from "@/components/dashboard/admin/AdminQuickLinks";
import ProfileCard from "@/components/dashboard/ProfileCard";
import { getUser } from "@/lib/api/session";
import { getUserProfile } from "@/lib/api/users/data";

const AdminDashboard = async () => {
  const user = await getUser();
  const profileResult = await getUserProfile(user.email);
  const profile = profileResult?.message ? null : profileResult;

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="Admin Dashboard"
        description="Manage tickets, users, and homepage advertisements."
      />
      <ProfileCard user={user} profile={profile} />
      <AdminQuickLinks />
    </div>
  );
};

export default AdminDashboard;
