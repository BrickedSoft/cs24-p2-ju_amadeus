import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";


export async function GET(request: NextRequest) {
  const userId = await validateTokenUser(request.headers)

  if (!userId)
    return NextResponse.json({
      message: "Invalid login"
    },
      { status: 400 })

  const user = await prisma.user.findUnique({ where: { id: userId } });

  return NextResponse.json({
    user: user
  },
    { status: 200 });
}

export async function PUT(request: NextRequest) {
  const userId = await validateTokenUser(request.headers)

  if (!userId)
    return NextResponse.json({
      message: "Invalid login"
    },
      { status: 400 })

  const updates = await request.json()
  const user = await prisma.user.findUnique({ where: { id: userId } })
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      ...user,
      ...updates
    }
  })

  return NextResponse.json({
    user: updatedUser
  },
    { status: 200 });
}


