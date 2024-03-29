import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";
import { z } from "zod";

const schema = z.object({
  number: z.string(),
  type: z.string(),
  capacity: z.string(),
});

export async function GET(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  const vehicles = await prisma.vehicle.findMany();

  return NextResponse.json(
    {
      vehicles: vehicles,
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);

  const parsed = schema.safeParse(await request.json());

  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Invalid data",
      },
      { status: 400 },
    );

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  const { number, type, capacity } = parsed.data;
  const vehicleExist = await prisma.vehicle.findUnique({
    where: { number: number },
  });

  if (vehicleExist)
    return NextResponse.json(
      {
        message: "Vehicle number already registered",
      },
      { status: 400 },
    );

  const vehicle = await prisma.vehicle.create({
    data: {
      number: number,
      type: type,
      capacity: capacity,
    },
  });

  return NextResponse.json(
    {
      vehicle: vehicle,
    },
    { status: 200 },
  );
}
