"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteUser = async (
  userId: string,
  prevState: any,
  formData: FormData,
) => {
  await prisma.user.delete({
    where: { id: userId },
  });
  revalidatePath("/");
  redirect("/dashboard/entry/users/");
};
