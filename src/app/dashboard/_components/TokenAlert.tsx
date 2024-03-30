import { cookies } from "next/headers";
import { Suspense } from "react";

import { userDataEndpoint } from "@/assets/data/api/endpoints";
import { resetTokenCardData } from "@/assets/data/dashboard/account/general";
import TokenCard from "./TokenCard";

const TokenAlert = async () => {
  const cookieStore = cookies();

  let userData = await fetch(
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
    <Suspense>
      <TokenCard
        info={{
          ...resetTokenCardData,
          actionLabel: userData.user[resetTokenCardData.actionLabel],
        }}
      />
    </Suspense>
  );
};

export default TokenAlert;
