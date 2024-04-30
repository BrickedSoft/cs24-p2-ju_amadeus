'use server'
import { z } from "zod"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const updateSts = async (stsId: string, prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().optional(),
    wardNumber: z.string().optional(),
    capacity: z.string().optional(),
    longitude: z.string().optional(),
    latitude: z.string().optional(),
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
      capacity: parsed.capacity? parseFloat(parsed.capacity) : undefined,
      longitude:parsed.longitude? parseFloat(parsed.longitude) : undefined,
      latitude: parsed.latitude? parseFloat(parsed.latitude) : undefined,
      wardNumber: parsed.wardNumber ,
    }
  })
  revalidatePath('/')
  redirect('/dashboard/entry/sts/')
}