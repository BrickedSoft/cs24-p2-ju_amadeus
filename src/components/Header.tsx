import Link from "next/link";

import { button } from "@/assets/data/auth/login";
import { routes } from "@/assets/data/routes";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="h-20 flex justify-between items-center px-12">
      <Link href={routes.home}>
        <Logo className="h-12 w-12" />
      </Link>
      <Link href={button.login.href}>
        <Button size="lg">{button.login.title}</Button>
      </Link>
    </header>
  );
};

export default Header;
