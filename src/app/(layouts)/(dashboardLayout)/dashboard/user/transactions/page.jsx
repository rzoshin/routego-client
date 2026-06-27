import DashboardHeading from "@/components/dashboard/DashboardHeading";
import TransactionsTable from "@/components/dashboard/user/TransactionsTable";
import { fetchUserTransactions } from "@/lib/api/payments/data";
import { getUser } from "@/lib/api/session";

const UserTransactionsPage = async () => {
  const user = await getUser();
  const transactions = (await fetchUserTransactions(user.email)) || [];

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="My Transactions"
        description="View your payment history and transaction IDs."
      />
      <TransactionsTable transactions={Array.isArray(transactions) ? transactions : []} />
    </div>
  );
};

export default UserTransactionsPage;
