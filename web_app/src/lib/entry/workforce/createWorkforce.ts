"use server";

import { routes } from "@/assets/data/routes";
import prisma from "@/lib/db";
import { Contractor, STS } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createWorkforce = async (prevState: any, formData: FormData) => {
  console.log(formData);
  const schema = z.object({
    name: z.string().min(1),
    dateOfBirth: z.string().pipe(z.coerce.date()),
    nid: z.string().min(1),
    designation: z.string().min(1),
    joiningDate: z.string().pipe(z.coerce.date()),
    salary: z.string().min(1),
    contact: z.string().min(1),
    userId: z.string().min(1),
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

  const contractor: Contractor | null = parsed.contractorId
    ? await prisma.contractor.findUnique({
        where: { id: parsed?.contractorId },
      })
    : null;

  const required = {
    name: parsed.name,
    dateOfBirth: parsed.dateOfBirth,
    nid: parsed.nid,
    designation: parsed.designation,
    joiningDate: parsed.joiningDate,
    salary: parseFloat(parsed.salary),
    contact: parsed.contact,
    user: { connect: { id: parsed.userId } },
  };

  await prisma.workforce.create({
    data: contractor
      ? {
          ...required,
          contractor: { connect: { id: contractor.id } },
        }
      : {
          ...required,
        },
  });
  revalidatePath("/");
  redirect(routes.contractor);
};
