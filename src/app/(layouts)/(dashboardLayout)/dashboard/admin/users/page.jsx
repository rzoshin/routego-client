import DashboardHeading from "@/components/dashboard/DashboardHeading";
import AdminUsersTable from "@/components/dashboard/admin/AdminUsersTable";
import { getAllUsers } from "@/lib/api/users/data";

const ManageUsers = async () => {
  const users = (await getAllUsers()) || [];

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="Manage Users"
        description="Change user roles and flag fraudulent vendors."
      />
      <AdminUsersTable users={Array.isArray(users) ? users : []} />
    </div>
  );
};

export default ManageUsers;
