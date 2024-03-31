import { cookies } from "next/headers";
import { Suspense } from "react";

import {
  roleFromString,
  sideNavEntry,
} from "@/assets/data/dashboard/dashboard";
import Loading from "@/components/Loading";
import SideNav from "../_sidenav/SideNav";
export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-background w-full px-12 mt-12 ">
      <div className="flex">
        <SideNav
          sideNavValue={sideNavEntry(
            roleFromString(cookies().get("role")?.value)
          )}
        />
        <div className=" w-full flex flex-col items-center px-4">
          <div className="w-full max-w-[1033px] min-w-[410px]">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
