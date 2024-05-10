import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";

export async function GET(request: NextRequest) {
  const adminAuth = validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const roles = await prisma.role.findMany();

  return NextResponse.json(
    {
      roles: roles,
    },
    { status: 200 },
  );
}
