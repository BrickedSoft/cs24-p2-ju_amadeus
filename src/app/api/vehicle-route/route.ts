import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";
import { z } from "zod";
import { STS, VehicleRoute } from "@prisma/client";

export async function GET(request: NextRequest) {
  const auth = await validateTokenUser(request)

  if (!auth)
    return NextResponse.json({
      message: "Insuficient permission"
    },
      { status: 400 })

  let vehicleRouteList = await prisma.vehicleRoute.findMany()


  return NextResponse.json({
    vehicleRoutes: vehicleRouteList
  },
    { status: 200 });
}

const schema = z.object({
  distance: z.number(),
  duration: z.number(),
  stsId: z.string(),
  landfillId: z.string(),
})


export async function POST(request: NextRequest) {
  console.log(request)
  const auth = await validateTokenUser(request);

  const parsed = schema.safeParse(await request.json());

  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Invalid data",
      },
      { status: 400 },
    );

  if (!auth)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  const { distance, duration, stsId, landfillId } = parsed.data;

  // Create a Route
  const newRoute: VehicleRoute = await prisma.vehicleRoute.create({
    data: {
      distance: distance,
      duration: duration,
      STS: {
        connect: { id: stsId }
      },
      LandFill: {
        connect: { id: landfillId }
      }
    }
  })


  return NextResponse.json(
    {
      vehicleRoute: newRoute
    },
    { status: 200 },
  );
}



