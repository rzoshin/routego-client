import { getUser } from "@/lib/api/session";
import { redirect } from "next/navigation";

const VALID_ROLES = ["user", "vendor", "admin"];

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const role = user.role || "user";

  if (!VALID_ROLES.includes(role)) {
    redirect("/unauthorized");
  }

  redirect(`/dashboard/${role}`);
}
