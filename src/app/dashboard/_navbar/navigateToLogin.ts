"use server";

import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";

export async function navigateToLogin(data: FormData) {
  const oneDay = 24 * 60 * 60 * 1000;
  const userId = cookies().get("userId")?.value;
  const token = cookies().get("token")?.value;

  await prisma?.loginToken.deleteMany({ where: { id: userId, token: token } });

  cookies().set("token", "value", { expires: Date.now() - oneDay });
  cookies().set("userId", "value", { expires: Date.now() - oneDay });
  cookies().set("role", "value", { expires: Date.now() - oneDay });

  redirect("/", RedirectType.replace);
}
