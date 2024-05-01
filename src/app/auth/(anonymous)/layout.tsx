import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { routes } from "@assets/data/routes";

type AuthProps = {
  children: React.ReactNode;
};

const AnonymousLayout: React.FC<AuthProps> = ({ children }) => {
  const cookieStore = cookies();
  if (cookieStore.has("token")) {
    redirect(routes.dashboard, RedirectType.replace);
  }

  return <>{children}</>;
};

export default AnonymousLayout;
