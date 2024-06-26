"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { routes } from "@assets/data/routes";

export async function navigateToHome() {
  const userId = cookies().get("userId")?.value;
  const token = cookies().get("token")?.value;

  await prisma?.loginToken.deleteMany({ where: { id: userId, token: token } });

  cookies().delete("userId");
  cookies().delete("token");
  cookies().delete("role");

  redirect(routes.home, RedirectType.replace);
}
