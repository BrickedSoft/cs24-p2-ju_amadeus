import { Suspense } from "react";
import { cookies } from "next/headers";
import Link from "next/link";

import { button } from "@assets/data/header";
import { routes } from "@assets/data/routes";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";
import Refresh from "./Refresh";

const Header: React.FC = () => {
  const cookieStore = cookies();

  return (
    <header className="h-20 flex justify-between items-center px-12">
      <Suspense fallback={null}>
        <Refresh />
      </Suspense>
      <Link href={routes.home}>
        <Logo className="h-12 w-12" />
      </Link>
      <Link
        href={
          cookieStore.has("token") ? button.dashboard.href : button.login.href
        }
      >
        <Button className="!text-white text-small">
          {cookieStore.has("token")
            ? button.dashboard.title
            : button.login.title}
        </Button>
      </Link>
    </header>
  );
};

export default Header;
