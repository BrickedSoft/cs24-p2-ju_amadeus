"use server";

import { routes } from "@/assets/data/routes";
import prisma from "@/lib/db";
import { STS } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createContractor = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1),
    contractId: z.string().min(1),
    tin: z.string().min(1),
    contact: z.string().min(1),
    size: z.string().min(1),
    salary: z.string().min(1),
    wasteVolume: z.string().min(1),
    termination: z.string().pipe(z.coerce.date()),
    wardNumber: z.string().optional().nullable(),
    stsId: z.string().optional().nullable(),
  });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
    contractId: formData.get("contractId") || undefined,
    tin: formData.get("tin") || undefined,
    contact: formData.get("contact") || undefined,
    size: formData.get("size" || undefined),
    salary: formData.get("salary" || undefined),
    wasteVolume: formData.get("wasteVolume" || undefined),
    termination: formData.get("termination" || undefined),
    wardNumber: formData.get("wardNumber" || undefined),
    stsId: formData.get("stsId" || undefined),
  });

  const exists = await prisma.contractor.findUnique({
    where: { tin: parsed.tin },
  });
  if (exists) return { message: "Contractor with the email already exists." };
  const sts: STS | null = parsed.stsId
    ? await prisma.sTS.findUnique({
        where: { id: parsed?.stsId },
      })
    : null;

  const required = {
    name: parsed.name,
    contractId: parsed.contractId,
    tin: parsed.tin,
    contact: parsed.contact,
    size: parseInt(parsed.size),
    salary: parseFloat(parsed.salary),
    wasteVolume: parseFloat(parsed.wasteVolume),
    termination: parsed.termination,
  };

  await prisma.contractor.create({
    data: sts
      ? {
          ...required,
          wardNumber: parsed?.wardNumber,
          STS: { connect: { id: sts?.id } },
        }
      : required,
  });
  revalidatePath("/");
  redirect(routes.contractor);
};
