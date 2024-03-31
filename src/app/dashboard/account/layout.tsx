import { Suspense } from "react";

import { sideNavAccount } from "@/assets/data/dashboard/dashboard";
import SideNav from "../_sidenav/SideNav";
import Loading from "@/components/Loading";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-background w-full px-12 pb-12 mt-12 ">
      <div className="flex">
        <SideNav sideNavValue={sideNavAccount} />
        <div className=" w-full flex flex-col items-center px-4">
          <div className="w-full max-w-[829px] min-w-[410px]">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
