import Hero from "@/components/homepage/Hero";
import FeaturedTickets from "@/components/homepage/FeaturedTickets";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import Stats from "@/components/homepage/Stats";
import PopularRoutes from "@/components/homepage/PopularRoutes";
import Testimonials from "@/components/homepage/Testimonials";
import CTA from "@/components/homepage/Cta";
import { Toaster } from "react-hot-toast";

export default async function HomePage() {
    return (
        <main>
            <Hero />
            <FeaturedTickets />
            <PopularRoutes />
            <WhyChooseUs />
            <Stats />
            <Testimonials />
            <CTA />
            <Toaster />
        </main>
    )
}