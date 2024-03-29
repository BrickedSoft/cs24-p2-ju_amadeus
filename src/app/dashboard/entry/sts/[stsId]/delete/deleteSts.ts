'use server'
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const deleteSts = async (stsId: string, prevState: any, formData: FormData) => {
  await prisma.sTS.delete({
    where: { id: stsId },
  })
  revalidatePath('/')
  redirect('/dashboard/entry/sts/')
}