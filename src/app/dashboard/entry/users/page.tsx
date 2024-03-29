import { DataTable } from "./_users/data-table";
import { columns } from "./_users/columns";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { userDataEndpoint } from "@/assets/data/api/endpoints";

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

export default async function Users() {
  const cookieStore = cookies();

  const data = await getData(cookieStore);

  return (
    <div className="container h-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
