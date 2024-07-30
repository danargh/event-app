import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {};

/**
 * Renders the footer component with a logo link and copyright information.
 *
 * @return {JSX.Element} The footer component.
 */

export const Footer = async ({}: Props) => {
   return (
      // Footer container
      <footer className="border-t">
         <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
            {/* Logo Link */}
            <Link href="/">
               <Image src="/favicon.svg" alt="logo" width={128} height={38} />
            </Link>

            {/* Copyright information */}
            <p>2024 Evently. All Rights reserved.</p>
         </div>
      </footer>
   );
};

export default Footer;
