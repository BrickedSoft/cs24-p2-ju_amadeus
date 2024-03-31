import { cookies } from "next/headers";
import { Suspense } from "react";

import { userDataEndpoint } from "@/assets/data/api/endpoints";
import { resetTokenGenerate } from "@/assets/data/dashboard/account/general";
import Loading from "@/components/Loading";
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
    <Suspense fallback={<Loading />}>
      <TokenCard
        info={{
          ...resetTokenGenerate,
          actionLabel: userData.user[resetTokenGenerate.actionLabel],
        }}
      />
    </Suspense>
  );
};

export default TokenAlert;
