import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "RouteGo - Book Your Next Journey in Minutes",
  description: "Discover and book Bus, Train, Launch, and Flight tickets. One journey, endless destinations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#080c16] text-[#f3f4f6]">
        <main className="flex-grow flex flex-col">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
