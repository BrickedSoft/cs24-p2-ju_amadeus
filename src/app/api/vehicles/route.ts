import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";


export async function GET(request: NextRequest) {
  const auth = await validateTokenUser(request);

  if (!auth)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  // gives vehicle under STS which are under the auth user
  if (auth.role == RoleType.STS_MANAGER)
    return NextResponse.json(
      {
        vehicles: await prisma.vehicle.findMany({
          where: {
            STS: {
              manager: {
                some: { id: auth.userId }
              }
            }
          }
        })
        ,
      },
      { status: 200 },
    );


  return NextResponse.json(
    {
      vehicles: await prisma.vehicle.findMany()
      ,
    },
    { status: 200 },
  );
}
