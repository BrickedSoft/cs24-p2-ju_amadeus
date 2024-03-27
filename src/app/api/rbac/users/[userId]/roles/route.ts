import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import prisma from "@/lib/db"
import { validateTokenUser } from "@/lib/db-utils/auth"
import { RoleType } from "@/lib/constants/userContants";

const schema = z.object({
  role: z.string(),
});

export async function PUT(request: NextRequest,
  { params }: { params: { userId: string } }) {
  const parsed = schema.safeParse(await request.json())

  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN)

  if (!parsed.success || !authAdmin) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    )
  }
  const { role } = parsed.data
  const userRole = await prisma.role.findUnique({ where: { name: role } })
  const user = await prisma.user.update({
    where: { id: params.userId },
    data: {
      role: { connect: { id: userRole?.id } }
    }
  });

  return NextResponse.json(
    { user: user },
    { status: 200 })

}
