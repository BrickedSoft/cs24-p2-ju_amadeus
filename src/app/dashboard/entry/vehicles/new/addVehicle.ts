"use server";
import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addVehicle = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    number: z.string().min(1),
    type: z.string().min(1),
    capacity: z.string().min(1),
    fuelCostUnloaded: z.string().min(1),
    fuelCostLoaded: z.string().min(1)

  });

  const parsed = schema.parse({
    number: formData.get("number") || undefined,
    type: formData.get("type") || undefined,
    capacity: formData.get("capacity") || undefined,
    fuelCostUnloaded: formData.get("fuelCostUnloaded") || undefined,
    fuelCostLoaded: formData.get("fuelCostLoaded") || undefined
  });

  const exists = await prisma.vehicle.findUnique({
    where: { number: parsed.number },
  });
  if (exists) return { message: "Vehicle with the number already exists." };
  await prisma.vehicle.create({
    data: {
      number: parsed.number,
      type: parsed.type,
      capacity: parseFloat(parsed.capacity),
      fuelCostUnloaded: parseFloat(parsed.fuelCostUnloaded),
      fuelCostLoaded: parseFloat(parsed.fuelCostLoaded)
    },
  });
  revalidatePath("/");
  redirect("/dashboard/entry/vehicles");
};
