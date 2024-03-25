import { LoginToken, User } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import prisma from "@/lib/db"
import { generateRandomToken, hashPassword } from "@/lib/utils/encoding"

const schema = z.object({
  email: z.string().email(),
  resetToken: z.string(),
  password: z.string()
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    )
  }

  const { email, resetToken, password } = parsed.data

  const user: User | null = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email" },
      { status: 400 }
    )
  }

  if (user.resetToken != resetToken) {
    return NextResponse.json(
      { message: "Invalid reset token" },
      { status: 400 }
    )
  }

  await prisma.user.update({
    where: user,
    data: {
      ...user,
      password: await hashPassword(password),
      resetToken: generateRandomToken(8)
    }
  })

  return NextResponse.json(
    { message: "Success" },
    { status: 200 })

}
