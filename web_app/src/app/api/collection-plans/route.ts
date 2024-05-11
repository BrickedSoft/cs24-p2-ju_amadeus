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

  const collectionPlans = await prisma.collectionPlan.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(
    {
      collectionPlans: collectionPlans
    },
    { status: 200 }
  );
}
