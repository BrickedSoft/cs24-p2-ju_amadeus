"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import prisma from "@lib/db";

export const updateVehicle = async (
  vehicleId: string,
  prevState: any,
  formData: FormData,
) => {
  const schema = z.object({
    number: z.string().optional(),
    type: z.string().optional(),
    capacity: z.string().optional(),
    fuelCostUnloaded: z.string().optional(),
    fuelCostLoaded: z.string().optional(),
    stsId: z.string().optional(),
  });

  const parsed = schema.parse({
    number: formData.get("number") || undefined,
    type: formData.get("type") || undefined,
    capacity: formData.get("capacity") || undefined,
    fuelCostUnloaded: formData.get("fuelCostUnloaded") || undefined,
    fuelCostLoaded: formData.get("fuelCostLoaded") || undefined,
    stsId: formData.get("stsId") || undefined,
  });

  const exists = await prisma.vehicle.findUnique({
    where: { number: vehicleId },
  });
  if (exists) return { message: "Vehicle with the number already exists." };
  const vehicle = await prisma.vehicle.update({
    where: { id: vehicleId },
    data: {
      number: parsed.number,
      type: parsed.type,
      capacity: parsed.capacity ? parseFloat(parsed.capacity) : undefined,
      fuelCostUnloaded: parsed.fuelCostUnloaded
        ? parseFloat(parsed.fuelCostUnloaded)
        : undefined,
      fuelCostLoaded: parsed.fuelCostLoaded
        ? parseFloat(parsed.fuelCostLoaded)
        : undefined,
    },
    include: {
      STS: true,
    },
  });
  if (parsed.stsId) {
    if (vehicle.STS) {
      await prisma.vehicle.update({
        where: { id: vehicleId },
        data: { STS: { disconnect: true } },
      });
    }
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { STS: { connect: { id: parsed.stsId } } },
    });
  }
  revalidatePath("/");
  redirect("/dashboard/entry/vehicles");
};
