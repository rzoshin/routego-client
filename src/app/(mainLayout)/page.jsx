import Cta from "@/components/homepage/Cta";
import FeaturedTickets from "@/components/homepage/FeaturedTickets";
import Hero from "@/components/homepage/Hero";
import PopularRoutes from "@/components/homepage/PopularRoutes";
import Stats from "@/components/homepage/Stats";
import Testimonials from "@/components/homepage/Testimonials";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedTickets />
      <WhyChooseUs />
      <Stats />
      <PopularRoutes />
      <Testimonials />
      <Cta />
    </main>
  );
}