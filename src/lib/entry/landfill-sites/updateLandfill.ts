'use server'
import { z } from "zod"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const updateLandfill = async (landfillId: string, prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().optional(),
    longitude: z.string().optional(),
    latitude: z.string().optional(),
  })

  const parsed = schema.parse({
    name: formData.get('name') || undefined,
    longitude: formData.get('longitude') || undefined,
    latitude: formData.get('latitude') || undefined
  })

  await prisma.landFill.update({
    where: { id: landfillId },
    data: {
      name: parsed.name,
      longitude: parsed.longitude ? parseFloat(parsed.longitude) : undefined,
      latitude: parsed.latitude ? parseFloat(parsed.latitude) : undefined,
    }
  })
  revalidatePath('/')
  redirect('/dashboard/entry/landfill-sites/')
}