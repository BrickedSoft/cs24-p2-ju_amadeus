"use server";

import { routes } from "@/assets/data/routes";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteContractor = async (
  contractorId: string,
  prevState: any,
  formData: FormData
) => {
  await prisma.contractor.delete({
    where: { id: contractorId },
  });
  revalidatePath("/");
  redirect(routes.contractor);
};
