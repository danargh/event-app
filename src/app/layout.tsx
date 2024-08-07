import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

// create font for css variable
const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   variable: "--font-poppins",
});

export const metadata: Metadata = {
   title: "Event App",
   description: "Generated by create next app",
   icons: {
      icon: "/favicon.svg",
   },
};

interface LayoutProps {
   children: React.ReactNode;
   session: any;
}

export default function RootLayout({ children, session }: LayoutProps) {
   return (
      <html lang="en">
         <SessionProvider session={session}>
            <body className={poppins.variable}>{children}</body>
         </SessionProvider>
      </html>
   );
}
