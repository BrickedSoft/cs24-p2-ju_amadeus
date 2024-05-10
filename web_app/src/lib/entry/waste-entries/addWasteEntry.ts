"use server";

import { routes } from "@/assets/data/routes";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addWasteEntry = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    wasteVolume: z.string(),
    collectionDate: z.string().pipe(z.coerce.date()),
    vehicleId: z.string().min(1),
    wasteType: z.string().min(1),
    contractorId: z.string().min(1),
    stsId: z.string().min(1),
  });

  const parsed = schema.parse({
    wasteVolume: formData.get("wasteVolume") || undefined,
    collectionDate: formData.get("collectionDate") || undefined,
    vehicleId: formData.get("vehicleId") || undefined,
    wasteType: formData.get("wasteType") || undefined,
    contractorId: formData.get("contractorId") || undefined,
    stsId: formData.get("stsId") || undefined,
  });

  await prisma.wasteEntry.create({
    data: {
      wasteVolume: parseFloat(parsed.wasteVolume),
      collectionDate: parsed.collectionDate,
      vehicle: { connect: { id: parsed.vehicleId } },
      wasteType: parsed.wasteType,
      contractor: { connect: { id: parsed.contractorId } },
      STS: { connect: { id: parsed.stsId } },
    },
    include: { vehicle: true },
  });

  revalidatePath("/");
  redirect(routes.wasteEntries);
};
