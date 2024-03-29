import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";

export async function GET(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN)

  if (!authAdmin)
    return NextResponse.json({
      message: "Insuficient permission"
    },
      { status: 400 })

  const stsList = await prisma.sTS.findMany()

  return NextResponse.json({
    sts: stsList
  },
    { status: 200 });
}




