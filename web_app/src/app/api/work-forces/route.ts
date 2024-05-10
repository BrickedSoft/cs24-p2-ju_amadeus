import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = await validateTokenUser(request);

  if (!auth)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const workForces = await prisma.workforce.findMany({
    include: {
      manager: true,
      contractor: true,
    },
  });

  return NextResponse.json(
    {
      workForces: workForces.map((ele) => ({
        ...ele,
        managerName: ele.manager?.name,
        contractorName: ele.contractor?.name,
      })),
    },
    { status: 200 }
  );
}
