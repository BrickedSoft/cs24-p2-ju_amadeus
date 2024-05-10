import { cookies } from "next/headers";

import { userDataEndpoint } from "@assets/data/api/endpoints";
import ChangePasswordInitiate from "./initiate/page";

const ChangePassword: React.FC = async () => {
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

  console.log(userData);

  return <ChangePasswordInitiate />;
};

export default ChangePassword;
