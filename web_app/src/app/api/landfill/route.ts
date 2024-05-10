import { NextRequest, NextResponse } from "next/server";

import { RoleType } from "@/constants/userContants";
import prisma from "@lib/db";
import { validateTokenUser } from "@lib/db-utils/auth";
import { LandFill } from "@prisma/client";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const auth = await validateTokenUser(request);

  if (!auth)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  if (auth.role == RoleType.LANDFILL_MANAGER)
    return NextResponse.json(
      {
        landfills: await prisma.landFill.findMany({
          where: {
            manager: { some: { id: auth.userId } },
          },
        }),
      },
      { status: 200 }
    );

  return NextResponse.json(
    {
      landfills: await prisma.landFill.findMany(),
    },
    { status: 200 }
  );
}

const schema = z.object({
  name: z.string().min(1),
  longitude: z.number(),
  latitude: z.number(),
});

export async function POST(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);

  const parsed = schema.safeParse(await request.json());

  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Invalid data",
      },
      { status: 400 }
    );

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const { name, longitude, latitude } = parsed.data;

  // Create a Landfill Site
  const landfill: LandFill = await prisma.landFill.create({
    data: {
      name: name,
      longitude: longitude,
      latitude: latitude,
    },
  });

  return NextResponse.json(
    {
      landfill: landfill,
    },
    { status: 200 }
  );
}
