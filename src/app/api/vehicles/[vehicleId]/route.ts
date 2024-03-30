import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";

export async function GET(
  request: NextRequest,
  { params }: { params: { vehicleId: string } },
) {
  const auth = await validateTokenUser(request);
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const queryUserId = params.vehicleId;

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: queryUserId }, include: {
      STS: true
    }
  });

  if (!vehicle)
    return NextResponse.json(
      {
        message: "Not found",
      },
      { status: 400 },
    );

  return NextResponse.json(
    {
      message: "success",
      vehicle
    },
    { status: 200 },
  );
}