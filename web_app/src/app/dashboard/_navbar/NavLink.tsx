"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Link as NavLinkData } from "@allTypes";

const NavLink: React.FC<NavLinkData> = ({ title, href }) => {
  const currPath = usePathname();
  const active =
    href == currPath || (currPath.includes(href) && href != "/dashboard");

  return (
    <Link
      href={href}
      key={href}
      className={`text-medium font-medium backdrop-blur cursor-pointer hover:text-green-600 pb-0.5 ${active ? "text-foreground border-b-green-400 border-b-2" : "text-gray-600"} tracking-colors duration-300`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
