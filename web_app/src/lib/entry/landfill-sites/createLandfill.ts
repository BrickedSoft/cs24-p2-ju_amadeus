"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createLandfill = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1),
    longitude: z.string().min(1),
    latitude: z.string().min(1),
  });

  const parsed = schema.parse({
    name: formData.get("name") || undefined,
    longitude: formData.get("longitude") || undefined,
    latitude: formData.get("latitude") || undefined,
  });

  await prisma.landFill.create({
    data: {
      name: parsed.name,
      longitude: parseFloat(parsed.longitude),
      latitude: parseFloat(parsed.latitude),
    },
  });

  revalidatePath("/");
  redirect("/dashboard/entry/landfill-sites/");
};
