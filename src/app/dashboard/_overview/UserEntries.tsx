import { cookies } from "next/headers";

import { userDataEndpoint } from "@/assets/data/api/endpoints";
import { People } from "@/components/Icons";

const UserEntries = async () => {
  const cookieStore = cookies();
  const userList = await fetch(`${userDataEndpoint}`, {
    cache: "no-store",
    // @ts-ignore
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });

  let userCount = {
    STSManager: 0,
    SystemAdmin: 0,
    LandfillManager: 0,
  };

  userList.users.filter((user: any) => {
    userCount[user.role as keyof typeof userCount]++;
  });

  const users = {
    STSManager: "STS Manager",
    SystemAdmin: "System Admin",
    LandfillManager: "Landfill Manager",
  };

  const colors = ["#048A52", "#339AF0", "#FF922B"];

  return (
    <div className="flex gap-4 justify-between items-center px-12 py-8 border border-gray-300 rounded-lg">
      {Object.values(userCount).map((item, index) => (
        <div key={index} className="flex flex-col gap-4">
          <h2
            className={`heading-tertiary`}
            style={{
              color: colors[index],
            }}
          >
            {users[Object.keys(userCount)[index] as keyof typeof users]}
          </h2>
          <div className="flex gap-4 items-center">
            <People
              className={`w-8 h-8`}
              style={{
                fill: colors[index],
              }}
            />
            <p
              className={`text-3xl font-semibold`}
              style={{
                color: colors[index],
              }}
            >
              {item}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserEntries;
