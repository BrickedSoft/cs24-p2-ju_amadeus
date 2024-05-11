
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/constants/userContants";
import { STS } from "@prisma/client";
import { z } from "zod";


export async function GET(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const authSTS = await validateTokenUser(request, RoleType.STS_MANAGER);

  if (!authAdmin && !authSTS)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  let stsList = await prisma.sTS.findMany();

  if (authSTS)
    stsList = await prisma.sTS.findMany({
      where: {
        manager: {
          some: { id: authSTS.userId },
        },
      },
    });

  return NextResponse.json(
    {
      sts: stsList,
    },
    { status: 200 }
  );
}
const schema = z.object({
  name: z.string().min(1),
  wardNumber: z.string().min(1),
  capacity: z.string(),
  longitude: z.number(),
  latitude: z.number(),
});

export async function POST(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const stsManager = await validateTokenUser(request, RoleType.STS_MANAGER);

  const parsed = schema.safeParse(await request.json());

  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Invalid data",
      },
      { status: 400 }
    );

  if (!authAdmin && !stsManager)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const { name, wardNumber, capacity, longitude, latitude } = parsed.data;

  // Create a STS
  const sts: STS = await prisma.sTS.create({
    data: {
      name: name,
      wardNumber: wardNumber,
      capacity: parseFloat(capacity),
      longitude: longitude,
      latitude: latitude,
    },
  });

  return NextResponse.json(
    {
      sts: sts,
    },
    { status: 200 }
  );
}
