"use server";
import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateUser = async (
  userId: string,
  prevState: any,
  formData: FormData,
) => {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
  });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    role: formData.get("role") || undefined,
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: parsed.name,
      email: parsed.email,
      role: { connect: { name: parsed.role } },
    },
  });
  revalidatePath("/");
  redirect("/dashboard/entry/users/");
};
