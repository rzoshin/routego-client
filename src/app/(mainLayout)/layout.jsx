import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function RootLayout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="flex-grow flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}