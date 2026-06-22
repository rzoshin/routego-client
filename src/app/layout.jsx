import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "./Providers";
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({ variable: '--font-sans', subsets: ['latin'] })

export const metadata = {
  title: "RouteGo - Book Your Next Journey in Minutes",
  description: "Discover and book Bus, Train, Launch, and Flight tickets. One journey, endless destinations.",
};

export const viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
}

export default function RootLayout({children}) {
  return (
    <html 
    lang="en" 
    suppressHydrationWarning
    className={`${plusJakartaSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Providers> 
          {children} 
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
