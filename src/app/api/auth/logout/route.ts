import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import prisma from "@/lib/db"
import { validateTokenUser } from "@/lib/db-utils/auth"

export async function POST(request: NextRequest) {
  const auth = await validateTokenUser(request)

  if (!auth) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    )
  }

  await prisma.loginToken.deleteMany({
    where: { userId: auth.userId, token: auth.token },
  });

  const res = NextResponse.json(
    { message: "Success" },
    { status: 200 })

  // make it expire
  const oneMonth = 30 * 24 * 60 * 60 * 1000

  res.cookies.set('userId', '', { expires: Date.now() - oneMonth })
  res.cookies.set('token', '', { expires: Date.now() - oneMonth })
  res.cookies.set('role','' , { expires: Date.now() - oneMonth })

  return res

}
