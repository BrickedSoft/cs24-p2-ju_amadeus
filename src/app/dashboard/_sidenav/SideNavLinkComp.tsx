"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavLink as NavLinkType } from "@allTypes";

const SideNavLinkComp: React.FC<NavLinkType> = ({ title, href }) => {
  const currPath = usePathname();
  const active = currPath.includes(href) ? "text-gray-900" : "";

  return (
    <Link href={href}>
      <button
        className={
          "w-full text-[15px] text-left rounded-[8px] text-gray-500 py-2 px-4  hover:bg-gray-200 " +
          active
        }
      >
        {title}
      </button>
    </Link>
  );
};

export default SideNavLinkComp;
