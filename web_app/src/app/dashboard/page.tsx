import { Suspense } from "react";
import { cookies } from "next/headers";

import { Users } from "@allTypes";
import { userDataEndpoint } from "@assets/data/api/endpoints";
import Loading from "@components/Loading";
import TokenAlert from "./_components/TokenAlert";
import TotalEntries from "./_overview/admin/TotalEntries";
import UserEntries from "./_overview/admin/UserEntries";
import StsOverview from "./_overview/sts/page";
import LandfillOverview from "./_overview/landfill/page";
import UserInfo from "./_overview/admin/UserInfo";
import ContractorUserInfo from "./_overview/contractor/UserInfo";
import { RoleType } from "@/constants/userContants";

const Dashboard: React.FC = async () => {
  const cookieStore = cookies();
  const userData = await fetch(
    `${userDataEndpoint}/${cookieStore.get("userId")?.value}`,
    {
      cache: "no-store",
      // @ts-ignore
      headers: {
        cookie: cookieStore,
      },
    }
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });

  return (
    <main className="w-full">
      <TokenAlert />
      <div className="max-w-6xl px-5 mx-auto my-12 flex flex-col gap-8">
        {/* <Suspense fallback={<Loading />}>
          <h1 className="heading-secondary text-primary">
            Welcome {userData.user.name}
          </h1>
        </Suspense> */}
        {userData.user.role === RoleType.SYSTEM_ADMIN && (
          <>
            <Suspense fallback={<Loading />}>
              <UserInfo />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <TotalEntries />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <UserEntries />
            </Suspense>
          </>
        )}
        {userData.user.role === RoleType.STS_MANAGER && <StsOverview />}
        {userData.user.role === RoleType.LANDFILL_MANAGER && (
          <LandfillOverview />
        )}
        {userData.user.role === RoleType.CONTRACTOR_MANAGER && (
          <ContractorUserInfo />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
