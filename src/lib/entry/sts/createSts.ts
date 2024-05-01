"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import prisma from "@lib/db";

export const createSts = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1),
    wardNumber: z.string().min(1),
    capacity: z.string().min(1),
    longitude: z.string().min(1),
    latitude: z.string().min(1),
  });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
    wardNumber: formData.get("wardNumber") || undefined,
    capacity: formData.get("capacity") || undefined,
    longitude: formData.get("longitude") || undefined,
    latitude: formData.get("latitude") || undefined,
  });

  await prisma.sTS.create({
    data: {
      name: parsed.name,
      wardNumber: parsed.wardNumber,
      capacity: parseFloat(parsed.capacity),
      longitude: parseFloat(parsed.longitude),
      latitude: parseFloat(parsed.latitude),
    },
  });

  revalidatePath("/");
  redirect("/dashboard/entry/sts/");
};
