import { Suspense } from "react";
import { cookies } from "next/headers";

import { userDataEndpoint } from "@assets/data/api/endpoints";
import { cardData } from "@assets/data/dashboard/account/general";
import Loading from "@components/Loading";
import InfoCard from "../_components/InfoCard";
import AccountEmail from "./_general/AccountEmail";
import AccountName from "./_general/AccountName";

const Account: React.FC = async () => {
  const cookieStore = cookies();
  let userData = await fetch(
    `${userDataEndpoint}/${cookieStore.get("userId")?.value}`,
    {
      cache: "no-store",
      // @ts-ignore
      headers: {
        cookie: cookieStore,
      },
    },
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });

  return (
    <Suspense fallback={<Loading />}>
      <AccountName name={userData.user.name} />
      {cardData.map((info) => (
        <InfoCard
          key={info.title}
          info={{ ...info, actionLabel: userData.user[info.actionLabel] }}
        />
      ))}
      <AccountEmail email={userData.user.email} />
    </Suspense>
  );
};

export default Account;
