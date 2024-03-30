import { navLinks } from "@/assets/data/dashboard/dashboard";
import { routes } from "@/assets/data/routes";
import Logo from "@/components/Logo";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { navigateToLogin } from "./navigateToLogin";
import NavLinkComp from "./NavLinkComp";

const Navbar: React.FC = () => {
  return (
    <nav className="max-w-full h-14 px-12 border-b-[1.5px] border-b-stone-200 flex">
      <div className="w-full h-full flex space-x-12 items-center">
        <Link href={routes.home}>
          <Logo className="h-10 w-10" />
        </Link>
        {navLinks.map((link) => (
          <NavLinkComp key={link.href} label={link.label} href={link.href} />
        ))}
      </div>
      <form
        className="h-full self-end flex items-center"
        action={navigateToLogin}
      >
        <button className="flex items-center hover:text-green-600 text-gray-600">
          <p className="text-sm mr-1 ">Logout</p>
          <ExitIcon className="cursor-pointer" />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
