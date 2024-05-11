import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/constants/userContants";
import { User } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const auth = await validateTokenUser(request);
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const queryUserId = params.userId;

  if (!authAdmin && (!auth || auth.userId != queryUserId))
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const user = await prisma.user.findUnique({
    where: { id: queryUserId },
    include: {
      STS: true,
      landfill: true,
      role: true,
      workforces: true,
      contractor: true,
    },
  });

  if (!user)
    return NextResponse.json(
      {
        message: "Not found",
      },
      { status: 400 }
    );

  return NextResponse.json(
    {
      message: "success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        resetToken: user.resetToken,
        role: user.role.name,
        STS: user.STS,
        landfill: user.landfill,
        contact: user.contact,
        workforces: user.workforces,
        contractor: user.contractor,
      },
    },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);

  const queryUserId = params.userId;

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const user = await prisma.user.delete({ where: { id: queryUserId } });

  if (!user)
    return NextResponse.json(
      {
        message: "Not found",
      },
      { status: 400 }
    );

  return NextResponse.json(
    {
      user: {
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        resetToken: user.resetToken,
      },
    },
    { status: 200 }
  );
}
