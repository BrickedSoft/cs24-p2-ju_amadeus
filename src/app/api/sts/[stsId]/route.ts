import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";
import { STS } from "@prisma/client";

export async function GET(request: NextRequest,
  { params }: { params: { stsId: string } }) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN)
  const queryStsId = params.stsId

  if (!authAdmin)
    return NextResponse.json({
      message: "Insuficient permission"
    },
      { status: 400 })

  const sts: STS | null = await prisma.sTS.findUnique({ where: { id: queryStsId } })

  return NextResponse.json({
    message: "success",
    sts
  },
    { status: 200 });
}


