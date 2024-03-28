'use server'

import { z } from "zod"
import prisma from "@/lib/db"
import { hashPassword } from "@/lib/utils/encoding"
import { Role } from "@prisma/client"

export const createUser = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1),
    role: z.string().min(1)
  })

  const parsed = schema.parse({
    name: formData.get('name') || undefined,
    email: formData.get('email') || undefined,
    password: formData.get('password') || undefined,
    role: formData.get('role') || undefined,
  })

  const exists = await prisma.user.findUnique({
    where: { email: parsed.email }
  })
  if (exists)
    return { message: 'User with the email already exists.' }
  const role: Role | null = await prisma.role.findUnique({ where: { name: parsed.role } })
  await prisma.user.create({
    data: {
      name: parsed.name, email: parsed.email,
      password: await hashPassword(parsed.password),
      role: { connect: { id: role?.id } }
    }
  })

  return { message: 'User created.' }
}