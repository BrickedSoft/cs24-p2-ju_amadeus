import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import Navbar from "./_navbar/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  if (!cookieStore.has("token")) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
