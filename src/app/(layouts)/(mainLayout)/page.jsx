import Hero from "@/components/homepage/Hero";
import FeaturedTickets from "@/components/homepage/FeaturedTickets";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import Stats from "@/components/homepage/Stats";
import PopularRoutes from "@/components/homepage/PopularRoutes";
import Testimonials from "@/components/homepage/Testimonials";
import CTA from "@/components/homepage/Cta";
import { Toaster } from "react-hot-toast";
import {
  fetchFeaturedTickets,
  fetchLatestTickets,
} from "@/lib/api/tickets/publicData";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [advertisedTickets, latestTickets] = await Promise.all([
    fetchFeaturedTickets(),
    fetchLatestTickets(),
  ]);

    return (
        <main>
            <Hero />
            <FeaturedTickets
                advertisedTickets={advertisedTickets}
                latestTickets={latestTickets}
            />
            <PopularRoutes />
            <WhyChooseUs />
            <Stats />
            <Testimonials />
            <CTA />
            <Toaster />
        </main>
    )
}