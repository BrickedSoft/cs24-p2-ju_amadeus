import { Suspense } from "react";
import { cookies } from "next/headers";

import { userDataEndpoint } from "@assets/data/api/endpoints";
import Loading from "@components/Loading";
import PasswordChange from "./_password/PasswordChange";
import TokenReset from "./_password/TokenReset";

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
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  });

  return (
    <Suspense fallback={<Loading />}>
      <TokenReset resetToken={userData.user.resetToken} />
      <PasswordChange />
    </Suspense>
  );
};

export default Account;
