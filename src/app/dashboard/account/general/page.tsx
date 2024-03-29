import { userDataEndpoint } from "@/assets/data/api/endpoints";
import AccountName from "./_general/AccountName";
import { cookies } from "next/headers";
import AccountEmail from "./_general/AccountEmail";
import { CardType } from "@/assets/data/dashboard/account/general";
import InfoCard from "../_account/InfoCard";

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

  const cardData: CardType[] = [
    {
      title: "Role",
      description: "This is your assigned role by the System Admin",
      instruction: "Your permissions are adjusted based on your role",
      actionLabel: "role",
    },
    {
      title: "Reset token",
      description: "This is your token to recover your account",
      instruction: "Make sure to write down this code",
      actionLabel: "resetToken",
    },
  ];

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
