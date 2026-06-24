import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { myTickets } from "@/lib/api/tickets/data";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import VendorManageTickets from "./VendorManageTickets";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

const VendorTickets = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const tickets = await myTickets(session?.user?.email)

    return (
        <div>
            <DashboardHeading
                title="My Added Tickets"
                description="Manage ticket"
            />
            <Suspense fallback={<Spinner />}>
                <VendorManageTickets tickets={tickets} />
            </Suspense>
        </div>
    );
};

export default VendorTickets;