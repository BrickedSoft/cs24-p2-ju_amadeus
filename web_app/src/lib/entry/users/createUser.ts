"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { hashPassword } from "@/lib/utils/encoding";
import { Contractor, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RoleType } from "@/constants/userContants";

export const createUser = async (prevState: any, formData: FormData) => {
  const schema = z
    .object({
      name: z.string().min(1),
      email: z.string().min(1),
      password: z.string().min(1),
      role: z.string().min(1),
      contact: z.string().nullable().optional(),
      contractorId: z.string().nullable().optional(),
    })
    .refine((schema) => {
      if (schema.role === RoleType.CONTRACTOR_MANAGER) {
        return schema.contact;
      }
      return true;
    });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    password: formData.get("password") || undefined,
    role: formData.get("role") || undefined,
    contact: formData.get("contact" || undefined),
    contractorId: formData.get("contractorId" || undefined),
  });

  const exists = await prisma.user.findUnique({
    where: { email: parsed.email },
  });
  if (exists) return { message: "User with the email already exists." };
  const role: Role | null = await prisma.role.findUnique({
    where: { name: parsed.role },
  });
  const contract: Contractor | null = parsed?.contractorId
    ? await prisma.contractor.findUnique({
        where: { id: parsed?.contractorId },
      })
    : null;

  const required = {
    name: parsed.name,
    email: parsed.email,
    password: await hashPassword(parsed.password),
    role: { connect: { id: role?.id } },
  };

  await prisma.user.create({
    data:
      parsed.role === RoleType.CONTRACTOR_MANAGER
        ? contract
          ? {
              ...required,
              contact: parsed.contact,
              contractor: { connect: { id: contract?.id } },
            }
          : {
              ...required,
              contact: parsed.contact,
            }
        : {
            ...required,
          },
  });
  revalidatePath("/");
  redirect("/dashboard/entry/users/");
};
