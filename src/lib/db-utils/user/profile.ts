"use server"

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'
export const updateUserWithId = async (userId: string, prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1)
  })

  const parsed = schema.parse({
    name: formData.get('name')
  })


  await prisma.user.update({
    where: { id: userId },
    data: {
      name: parsed.name
    }
  })

  revalidatePath('/')
  return { message: 'success' }
}