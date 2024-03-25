import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {

  const roles = await prisma.role.findMany();

  return NextResponse.json({
    roles: roles
  },
    { status: 200 });
}