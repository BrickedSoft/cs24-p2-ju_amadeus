import Link from "next/link";

import { navLinks } from "@assets/data/dashboard/nav";
import { routes } from "@assets/data/routes";
import Logo from "@components/Logo";
import { LogOut } from "@icons";
import { navigateToHome } from "@/lib/navigateToHome";
import NavLink from "./NavLink";

const Navbar: React.FC = () => {
  return (
    <nav className="max-w-full h-16 px-12 border-b-[1.5px] border-b-stone-200 flex">
      <div className="w-full h-full flex space-x-12 items-center">
        <Link href={routes.home}>
          <Logo className="h-10 w-10" />
        </Link>
        {navLinks.map((link) => (
          <NavLink key={link.href} title={link.title} href={link.href} />
        ))}
      </div>
      <form
        className="h-full self-end flex items-center"
        action={navigateToHome}
      >
        <button className="group flex items-center gap-1 md:gap-1.5">
          <p className="text-medium font-medium text-gray-600 group-hover:text-green-600 transition-colors duration-300">
            Logout
          </p>
          <LogOut className="cursor-pointer stroke-[36] text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
