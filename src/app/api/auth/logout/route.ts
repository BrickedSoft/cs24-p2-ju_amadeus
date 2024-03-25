import { LoginToken, User } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { boolean, z } from 'zod'
import prisma from "@/lib/db"
import { generateRandomToken, validatePassword } from "@/lib/utils/encoding"
import { validateTokenUser } from "@/lib/db-utils/auth"

const schema = z.object({
  userId: z.string(),
  token: z.string()
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json())

  const userId = await validateTokenUser(await request.json())

  if (!parsed.success || !userId) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    )
  }
  const { token } = parsed.data

  await prisma.loginToken.deleteMany({
    where: { userId: userId, token: token },
  });

  return NextResponse.json(
    { message: "Success" },
    { status: 200 })

}
