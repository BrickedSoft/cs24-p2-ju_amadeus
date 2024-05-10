import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type AuthProps = {
  children: React.ReactNode;
};

const AuthenticatedLayout: React.FC<AuthProps> = ({ children }) => {
  const cookieStore = cookies();
  if (!cookieStore.has("token")) {
    return notFound();
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
