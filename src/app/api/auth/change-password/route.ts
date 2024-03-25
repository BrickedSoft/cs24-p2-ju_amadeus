import { User } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import prisma from "@/lib/db"
import { hashPassword } from "@/lib/utils/encoding"
import { validateTokenUser } from "@/lib/db-utils/auth"

const schema = z.object({
  password: z.string()
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json())

  const userId = await validateTokenUser(request.headers)
  console.log(request.headers)

  if (!parsed.success || !userId) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    )
  }

  const { password } = parsed.data

  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email" },
      { status: 400 }
    )
  }


  await prisma.user.update({
    where: user,
    data: {
      ...user,
      password: await hashPassword(password),
    }
  })

  return NextResponse.json(
    { message: "Success" },
    { status: 200 })

}
