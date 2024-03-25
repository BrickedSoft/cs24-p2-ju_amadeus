import { LoginToken, User } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { boolean, z } from 'zod'
import prisma from "@/lib/db"
import { generateRandomToken, validatePassword } from "@/lib/utils/encoding"

const schema = z.object({
  email: z.string().email(),
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

  const { email, password } = parsed.data;

  const user: User | null = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })

  if (!user) {
    return NextResponse.json(
      { message: "Invalid Email or Password" },
      { status: 400 }
    )
  }

  const validated = await validatePassword(password, user.password)
  console.log(validated)

  if (!validated) {
    return NextResponse.json(
      { message: "Invalid Email or Password" },
      { status: 400 }
    )
  }

  const randomToken = generateRandomToken(16)

  const loginToken: LoginToken = await prisma.loginToken.create({
    data: { token: randomToken, user: { connect: user } }
  });

  if (!loginToken.token)
    return NextResponse.json({ status: 500 })

  const res = NextResponse.json(
    { message: "Success" },
    { status: 200 })

  res.headers.set('userId', user.id)
  res.headers.set('token', loginToken.token)
  return res
}
