"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/db";
import { generateRandomToken } from "@/lib/utils/encoding";
import { User } from "@prisma/client";
export const updateUserWithId = async (
  userId: string,
  prevState: any,
  formData: FormData,
) => {
  const schema = z.object({
    name: z.string().min(1),
  });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
  });

  const user: User | null = await prisma.user.findUnique({
    where: { id: userId },
  });
  await prisma.user.update({
    where: { id: userId },
    data: { ...user, name: parsed.name },
  });

  revalidatePath("/");
  return { message: "success" };
};

export const regenerateResetTokenWithId = async (
  userId: string,
  prevState: any,
  formData: FormData,
) => {
  const user: User | null = await prisma.user.findUnique({
    where: { id: userId },
  });
  await prisma.user.update({
    where: { id: userId },
    data: { ...user, resetToken: generateRandomToken(8) },
  });

  revalidatePath("/");
  return { message: "success" };
};
