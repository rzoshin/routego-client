"use client";

import { myTickets } from "@/lib/api/tickets/data";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import VendorManageTickets from "./VendorManageTickets";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { useSession } from "@/lib/auth-client";

const VendorTickets = async () => {
    const { data: session } = useSession();
    const tickets = await myTickets(session?.user?.email);

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