"use server";
import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { redirect } from "next/navigation";

export const updateUser = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    role: z.string().min(1),
  });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    role: formData.get("role") || undefined,
  });

  await prisma.user.update({
    where: { email: parsed.email },
    data: {
      name: parsed.name,
      email: parsed.email,
      role: { connect: { name: parsed.role } },
    },
  });
  revalidatePath("/");
  redirect("/dashboard/entry/users/");
};
