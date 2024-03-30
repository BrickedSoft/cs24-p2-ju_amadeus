import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";

export async function GET(request: NextRequest) {
  const auth = await validateTokenUser(request);

  if (!auth)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  const vehicleEntries = await prisma.vehicleEntry.findMany({
    where: {
      OR: [
        {
          STS: {
            manager: {
              some: { id: auth.userId }
            }
          }
        },
        {
          landFill: {
            manager: {
              some: { id: auth.userId }
            }
          }
        }]
    },
    include: {
      STS: true,
      landFill: true,
      vehicle: true
    }
  });

  return NextResponse.json(
    {
      vehicleEntries: vehicleEntries.map(ele => ({
        ...ele,
        stsName: ele.STS?.name,
        landfillName: ele.landFill?.name,
        vehicleNumber: ele.vehicle.number
      }))
    },
    { status: 200 },
  );
}
