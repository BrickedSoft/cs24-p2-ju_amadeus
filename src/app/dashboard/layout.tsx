import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { routes } from "@/assets/data/routes";
import Navbar from "./_navbar/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  if (!cookieStore.has("token")) {
    redirect(routes.login, RedirectType.replace);
  }

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-64px)]">{children}</div>
    </>
  );
}
