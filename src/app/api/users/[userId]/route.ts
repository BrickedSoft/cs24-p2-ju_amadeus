import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";

export async function GET(request: NextRequest,
  { params }: { params: { userId: string } }) {

  const userId = await validateTokenUser(request.headers)
  const adminAccess = await validateTokenUser(request.headers, RoleType.SYSTEM_ADMIN)
  const queryUserId = params.userId

  if (!adminAccess && (!userId || userId != queryUserId))
    return NextResponse.json({
      message: "Insuficient permission"
    },
      { status: 400 })

  const user = await prisma.user.findUnique({ where: { id: queryUserId } });


  if (!user)
    return NextResponse.json({
      message: "Not found"
    },
      { status: 400 })

  return NextResponse.json({
    user: {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      resetToken: user.resetToken
    }
  },
    { status: 200 });
}



export async function DELETE(request: NextRequest,
  { params }: { params: { userId: string } }) {

  const userId = await validateTokenUser(request.headers, RoleType.SYSTEM_ADMIN)

  const queryUserId = params.userId

  if (!userId)
    return NextResponse.json({
      message: "Insuficient permission"
    },
      { status: 400 })

  const user = await prisma.user.delete({ where: { id: queryUserId } });


  if (!user)
    return NextResponse.json({
      message: "Not found"
    },
      { status: 400 })

  return NextResponse.json({
    user: {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      resetToken: user.resetToken
    }
  },
    { status: 200 });
}

