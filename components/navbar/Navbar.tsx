"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BiHomeAlt } from "react-icons/bi";
import {LuMailMinus} from "react-icons/lu"
import { BsCalendar } from "react-icons/bs";
import { RiSettingsLine } from "react-icons/ri";
import NabvarItem from "./NavbarItem";


const Navbar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      { icon: BiHomeAlt, label: "Home", active: pathname === "/", href: "/" },
      {
        icon: BsCalendar,
        label: "Bookings",
        active: pathname === "/bookings",
        href: "/bookings",
      },
      {
        icon: LuMailMinus,
        label: "Inbox",
        active: pathname === "/inbox",
        href: "/inbox",
      },
      {
        icon: RiSettingsLine,
        label: "Settings",
        active: pathname === "/settings",
        href: "/settings",
      },
    ],
    [pathname]
  );

  return (
    <nav className="bg-white w-full p-4 rounded-t-3xl custom-top-shadow sm:hidden border-[1px] fixed bottom-0 z-20">
      <ul className="flex items-center gap-10  justify-center transition duration-500 ease-in-out">
        {routes.map((link, index) => {
          return (
           <NabvarItem {...link} key={index}/>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
