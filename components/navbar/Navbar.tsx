"use client";

import { usePathname } from "next/navigation";
import { BiHomeAlt, BiUser } from "react-icons/bi";
import { LuMailMinus } from "react-icons/lu";
import { BsCalendar } from "react-icons/bs";
import { RiSettingsLine } from "react-icons/ri";
import NabvarItem from "./NavbarItem";
import { useAuth } from "@/contexts/AuthContext";
import { MdCleaningServices } from "react-icons/md";
import { GiBroom } from "react-icons/gi";
import { PiBroomBold } from "react-icons/pi";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const routes = [
    { icon: BiHomeAlt, label: "Home", active: pathname === "/", href: "/" },
    {
      icon: BsCalendar,
      label: "Bookings",
      active: pathname === "/auth/bookings",
      href: user ? "/auth/bookings" : "/",
    },
    {
      icon: PiBroomBold,
      label: "Services",
      active: pathname === "/services",
      href: "/services",
    },
    /* {
      icon: LuMailMinus,
      label: "Chats",
      active: pathname === "/auth/chats",
      href: user ? "/auth/chats" : "/",
    }, */
    {
      icon: BiUser,
      label: "Profile",
      active: pathname === `/auth/account/${user?.id}`,
      href: `/auth/account/${user?.id}`,
    },
  ];

  return (
    <nav className="bg-white w-[350px]  p-4 rounded-full shadow-lg sm:hidden border-[1px] fixed right-6 left-1/2 -translate-x-1/2 bottom-8 z-20">
      <ul className="flex items-center gap-8 justify-center transition duration-500 ease-in-out   w-full  px-4">
        {routes.map((link, index) => {
          return <NabvarItem {...link} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
