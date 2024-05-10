"use server";
import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateUser = async (
  userId: string,
  prevState: any,
  formData: FormData
) => {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
    username: z.string().optional(),
    contact: z.string().optional(),
    contractCompany: z.string().optional(),
    accessLevel: z.string().optional(),
  });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    role: formData.get("role") || undefined,
    username: formData.get("username") || undefined,
    contact: formData.get("contact") || undefined,
    contractCompany: formData.get("contractCompany") || undefined,
    accessLevel: formData.get("accessLevel") || undefined,
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: parsed.name,
      email: parsed.email,
      role: { connect: { name: parsed.role } },
      username: parsed.username,
      contact: parsed.contact,
      contractCompany: parsed.contractCompany,
      accessLevel: parsed.accessLevel,
    },
  });
  revalidatePath("/");
  redirect("/dashboard/entry/users/");
};
