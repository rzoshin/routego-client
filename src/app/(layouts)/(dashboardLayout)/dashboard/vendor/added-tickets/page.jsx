"use client";

import { myTickets } from "@/lib/api/tickets/data";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import VendorManageTickets from "./VendorManageTickets";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { useState } from "react";
const VendorTickets = () => {
    const [tickets, setTickets] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchTickets = async () => {
            const tickets = await myTickets(session.user.email);
            setTickets(Array.isArray(tickets) ? tickets : []);
        };
        fetchTickets();
    }, [session?.user?.email]);

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