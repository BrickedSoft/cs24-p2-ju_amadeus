import { NextRequest, NextResponse } from "next/server";

import { RoleType } from "@lib/constants/userContants";
import prisma from "@lib/db";
import { validateTokenUser } from "@lib/db-utils/auth";

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
