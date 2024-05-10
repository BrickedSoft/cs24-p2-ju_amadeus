import { Suspense } from "react";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

import { userDataEndpoint } from "@assets/data/api/endpoints";
import {
  columnData,
  columnDropdownItems,
  pathToCreate,
  query,
  type,
} from "@assets/data/dashboard/entry/users";
import Loading from "@components/Loading";
import { deleteUser } from "@lib/entry/users/deleteUser";
import Middleware from "../_components/Middleware";

async function getData(cookieStore: any): Promise<User[]> {
  let userList = await fetch(`${userDataEndpoint}`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.users;
  });

  return userList;
}

const Users = async () => {
  const cookieStore = cookies();

  const data = await getData(cookieStore);

  return (
    <div className="container h-full">
      <Suspense fallback={<Loading />}>
        <Middleware
          data={data}
          type={type}
          columnData={columnData}
          columnDropdownItems={columnDropdownItems}
          deleteMethod={deleteUser}
          pathToCreate={pathToCreate}
          query={query}
        />
      </Suspense>
    </div>
  );
};

export default Users;
