import { Navbar } from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";


export default function RootLayout({children}) {
  return (
    <div>
          <Navbar /> 
          {children} 
          <Footer /> 
    </div>
  );
}
