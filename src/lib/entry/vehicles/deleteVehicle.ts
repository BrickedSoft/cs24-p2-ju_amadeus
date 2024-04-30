"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteVehicle = async (
  vehicleId: string,
  prevState: any,
  formData: FormData,
) => {
  await prisma.vehicle.delete({
    where: { id: vehicleId },
  });
  revalidatePath("/");
  redirect("/dashboard/entry/vehicles/");
};
