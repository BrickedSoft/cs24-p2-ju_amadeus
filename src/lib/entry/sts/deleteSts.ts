"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/db";

export const deleteSts = async (
  stsId: string,
  prevState: any,
  formData: FormData
) => {
  await prisma.sTS.delete({
    where: { id: stsId },
  });
  revalidatePath("/");
  redirect("/dashboard/entry/sts/");
};
