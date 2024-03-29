import { sideNavEntry } from "@/assets/data/dashboard/dashboard";
import SideNav from "../_sidenav/SideNav";
import { RoleType } from "@/lib/constants/userContants";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-background w-full px-12 mt-12 ">
      <div className="flex">
        <SideNav sideNavValue={sideNavEntry(RoleType.SYSTEM_ADMIN)} />
        <div className=' w-full flex flex-col items-center px-4'>
          <div className='w-full max-w-[925px] min-w-[410px]'>{children}</div>
        </div>
      </div>
    </main>
  );
}
