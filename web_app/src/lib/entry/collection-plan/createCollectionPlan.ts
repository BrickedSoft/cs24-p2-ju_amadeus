"use server";

import { routes } from "@/assets/data/routes";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createCollectionPlan = async (prevState: any, formData: FormData) => {
  console.log(formData);
  const schema = z.object({
    areaOfCollection: z.string().min(1),
    startTime: z.string().pipe(z.coerce.date()),
    durationForCollection: z.string(),
    numberOfLabors: z.string(),
    numberOfVans: z.string(),
    expectedWasteWeight: z.string(),
    userId: z.string()
  });

  const parsed = schema.parse({
    areaOfCollection: formData.get("areaOfCollection") || undefined,
    durationForCollection: formData.get("durationForCollection") || undefined,
    numberOfVans: formData.get("numberOfVans") || undefined,
    numberOfLabors: formData.get("numberOfLabors") || undefined,
    startTime: formData.get("startTime") || undefined,
    expectedWasteWeight: formData.get("expectedWasteWeight") || undefined,
    userId: formData.get("userId") || undefined
  });


  await prisma.collectionPlan.create({
    data: {
      areaOfCollection: parsed.areaOfCollection,
      durationForCollection: parseFloat(parsed.durationForCollection),
      numberOfLabors: parseInt(parsed.numberOfLabors),
      numberOfVans: parseInt(parsed.numberOfVans),
      expectedWasteWeight: parseFloat(parsed.expectedWasteWeight),
      user: {
        connect: { id: parsed.userId }
      }
    }
  })
  revalidatePath("/");
  redirect(routes.workForce);
};
