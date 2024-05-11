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

  const workHours = await prisma.workHour.findMany({
    include: {
      workforce: true,
    },
  });

  return NextResponse.json(
    {
        workHours: workHours.map((ele) => ({
        ...ele,
        workforceName: ele.workforce?.name,
      })),
    },
    { status: 200 }
  );
}
