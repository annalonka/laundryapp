import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarSimple from "./components/navbar";
import BookingProvider from "./context";
import { UserIcon, CalendarIcon } from "@heroicons/react/24/outline";

const links = [
  {
    text: "Booking",
    href: "/booking",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  { text: "Profile", href: "/profile", icon: <UserIcon className="w-6 h-6" /> },
];

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laundry service",
  description: "Book your washing machine here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarSimple items={links} />
        <div className="max-w-screen-xl m-auto px-4">
          <BookingProvider>{children}</BookingProvider>
        </div>
      </body>
    </html>
  );
}
