import Footer from "@/components/section/Footer";
import Header from "@/components/section/Header";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
   return (
      <div className="flex flex-col">
         <Header />
         <main className="flex-1">{children}</main>
         <Footer />
      </div>
   );
};

export default RootLayout;
