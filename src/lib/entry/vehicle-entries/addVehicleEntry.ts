"use server";
import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { VehicleEntry } from "@prisma/client";

export const addVehicleEntry = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    vehicleId: z.string().min(1),
    wasteVolume: z.string(),
    arrivalTime: z.string().pipe(z.coerce.date()),
    departureTime: z.string().pipe(z.coerce.date()),
    landfillId: z.string().optional(),
  });

  const parsed = schema.parse({
    wasteVolume: formData.get("wasteVolume") || undefined,
    arrivalTime: formData.get("arrivalTime") || undefined,
    departureTime: formData.get("departureTime") || undefined,
    vehicleId: formData.get("vehicleId") || undefined,
    landfillId: formData.get("landfillId") || undefined,
  });

  const entry: VehicleEntry = await prisma.vehicleEntry.create({
    data: {
      vehicle: { connect: { id: parsed.vehicleId } },
      wasteVolume: parseFloat(parsed.wasteVolume),
      arrivalTime: parsed.arrivalTime,
      departureTime: parsed.departureTime,
    },
    include: { vehicle: true },
  });

  if (!entry.vehicleId) redirect("/dashboard/entry/vehicle-entries");

  if (parsed.landfillId)
    await prisma.vehicleEntry.update({
      where: { id: entry.id },
      data: {
        landFill: { connect: { id: parsed.landfillId } },
      },
    });

  if (!parsed.landfillId) {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: entry.vehicleId,
      },
    });
    if (vehicle?.stsId)
      await prisma.vehicleEntry.update({
        where: { id: entry.id },
        data: {
          STS: {
            connect: {
              id: vehicle.stsId,
            },
          },
        },
      });
  }

  revalidatePath("/");
  redirect("/dashboard/entry/vehicle-entries");
};
