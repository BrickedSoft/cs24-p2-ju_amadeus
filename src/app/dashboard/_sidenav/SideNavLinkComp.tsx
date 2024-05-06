"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Link as NavLinkType } from "@allTypes";

const SideNavLinkComp: React.FC<NavLinkType> = ({ title, href }) => {
  const currPath = usePathname();
  const active = currPath.includes(href);

  return (
    <Link href={href}>
      <button
        className={`w-full text-medium text-left font-medium rounded-[8px] py-2 px-4 hover:bg-gray-200 ${active ? "text-foreground !bg-primary/20" : "text-gray-500"} transition-all duration-300`}
      >
        {title}
      </button>
    </Link>
  );
};

export default SideNavLinkComp;
