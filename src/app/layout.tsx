import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SetToken from "@/components/SetToken";
import StoreProvider from "@/providers/StoreProvider";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const ibmPlex = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Debate",
  description: "Space for thoughtful disagreement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${ibmPlex.className} antialiased lg:max-w-[100rem] lg:mx-auto mx-2 min-h-screen bg-white lg:ml-32 lg:mr-32 flex flex-col`}
      >
        <StoreProvider>
          <SessionProvider>
            <SetToken />
            <Toaster />
            <Navbar className="" />
            <main className="my-8  flex-grow flex flex-col ">{children}</main>
            <Footer />
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
