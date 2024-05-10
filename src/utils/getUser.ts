import { LandFill, STS } from "@prisma/client";

import { User } from "@allTypes";
import {
  landfillEndpoint,
  stsDataEndpoint,
  userDataEndpoint,
} from "@assets/data/api/endpoints";

export async function getSTS(cookieStore: any): Promise<STS[]> {
  let STSList = await fetch(stsDataEndpoint, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.sts;
  });

  return STSList;
}

export async function getLandfill(cookieStore: any): Promise<LandFill[]> {
  let LandfillList = await fetch(landfillEndpoint, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.landfills;
  });

  return LandfillList;
}

export async function getUser(cookieStore: any): Promise<User> {
  const userData = await fetch(
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

  return userData.user;
}
