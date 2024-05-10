"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { routes } from "@assets/data/routes";
import prisma from "@lib/db";

export const deleteVehicleEntry = async (
  entryId: string,
  prevState: any,
  formData: FormData
) => {
  await prisma.vehicleEntry.delete({
    where: { id: entryId },
  });
  revalidatePath("/");
  redirect(routes.vehicleEntries);
};
