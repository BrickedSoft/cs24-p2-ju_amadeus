"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { routes } from "@assets/data/routes";
import prisma from "@lib/db";

export const deleteLandfill = async (landfillId: string) => {
  await prisma.landFill.delete({
    where: { id: landfillId },
  });
  revalidatePath("/");
  redirect(routes.landfillSites);
};
