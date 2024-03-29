'use server'
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const deleteLandfill = async (landfillId: string, prevState: any, formData: FormData) => {
  await prisma.landFill.delete({
    where: { id: landfillId },
  })
  revalidatePath('/')
  redirect('/dashboard/entry/landfill-sites/')
}