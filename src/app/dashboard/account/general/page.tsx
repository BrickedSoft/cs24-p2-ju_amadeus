import { userDataEndpoint } from "@/assets/data/api/endpoints";
import { cardData } from "@/assets/data/dashboard/account/general";
import { cookies } from "next/headers";
import InfoCard from "../_account/InfoCard";
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
    }
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });

  return (
    <>
      <AccountName name={userData.user.name} />
      {cardData.map((info) => (
        <InfoCard
          key={info.title}
          info={{ ...info, actionLabel: userData.user[info.actionLabel] }}
        />
      ))}
      <AccountEmail email={userData.user.email} />
    </>
  );
};

export default Account;
