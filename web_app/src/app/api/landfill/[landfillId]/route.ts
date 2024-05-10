import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";
import { LandFill } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { landfillId: string } },
) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const queryLandfillId = params.landfillId;

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  const landfill: LandFill | null = await prisma.landFill.findUnique({
    where: { id: queryLandfillId },
  });

  return NextResponse.json(
    {
      message: "success",
      landfill,
    },
    { status: 200 },
  );
}
