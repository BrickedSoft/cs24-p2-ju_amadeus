"use server";

import { routes } from "@/assets/data/routes";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createWorkforce = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1),
    dateOfBirth: z.string().pipe(z.coerce.date()),
    nid: z.string().min(1),
    designation: z.string().min(1),
    joiningDate: z.string().pipe(z.coerce.date()),
    salary: z.string(),
    contact: z.string().min(1),
    userId: z.string(),
    contractorId: z.string().optional().nullable(),
  });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
    dateOfBirth: formData.get("dateOfBirth") || undefined,
    nid: formData.get("nid") || undefined,
    designation: formData.get("designation") || undefined,
    joiningDate: formData.get("joiningDate") || undefined,
    salary: formData.get("salary") || undefined,
    contact: formData.get("contact") || undefined,
    userId: formData.get("userId") || undefined,
    contractorId: formData.get("contractorId") || undefined,
  });

  const exists = await prisma.workforce.findUnique({
    where: { nid: parsed.nid },
  });
  if (exists) return { message: "Workforce with the nid already exists." };

  const required = {
    name: parsed.name,
    dateOfBirth: parsed.dateOfBirth,
    nid: parsed.nid,
    designation: parsed.designation,
    joiningDate: parsed.joiningDate,
    salary: parseFloat(parsed.salary),
    contact: parsed.contact,
    manager: { connect: { id: parsed.userId } },
  };

  const workForce = await prisma.workforce.create({
    data: parsed.contractorId
      ? {
          ...required,
          contractor: { connect: { id: parsed.contractorId } },
        }
      : {
          ...required,
        },
  });

  if (workForce && parsed.contractorId) {
    await prisma.contractor.update({
      where: { id: parsed.contractorId },
      data: {
        size: {
          increment: 1,
        },
      },
    });
  }

  revalidatePath("/");
  redirect(routes.workForce);
};
