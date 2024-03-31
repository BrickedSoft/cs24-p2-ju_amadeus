import { cookies } from "next/headers";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

import { routes } from "@/assets/data/routes";
import Logo from "@/components/Logo";
import AuthImage from "./AuthImage";

type AuthProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthProps> = ({ children }) => {
  const cookieStore = cookies();
  if (cookieStore.has("token")) {
    redirect(routes.dashboard, RedirectType.replace);
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <main className="relative grid md:grid-cols-[auto,1fr] gap-8 md:gap-16 items-center justify-between p-8 md:p-12 bg-white rounded-lg">
        <Link
          href="/"
          className="md:absolute mx-auto -mb-4 md:top-12 md:left-12"
        >
          <Logo className="w-12 h-12" />
        </Link>
        <AuthImage className="hidden md:block w-[350px] lg:w-full" />
        {children}
      </main>
    </section>
  );
};

export default AuthLayout;
