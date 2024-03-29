'use server'
import { z } from "zod"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const updateSts = async (stsId: string, prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().optional(),
    wardNumber: z.string().optional(),
    capacity: z.number().optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
  })

  const parsed = schema.parse({
    name: formData.get('name') || undefined,
    wardNumber: formData.get('wardNumber') || undefined,
    capacity: formData.get('capacity') || undefined,
    longitude: formData.get('longitude') || undefined,
    latitude: formData.get('latitude') || undefined
  })

  await prisma.sTS.update({
    where: { id: stsId },
    data: {
      name: parsed.name,
      capacity: parsed.capacity,
      longitude: parsed.longitude,
      latitude: parsed.latitude,
      wardNumber: parsed.wardNumber
    }
  })
  revalidatePath('/')
  redirect('/dashboard/entry/sts/')
}