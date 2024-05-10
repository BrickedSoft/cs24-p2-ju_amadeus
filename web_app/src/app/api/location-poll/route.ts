import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";



export async function POST(request: NextRequest) {
  const auth = await validateTokenUser(request);


  if (!auth)
    return NextResponse.json(
      {
        message: "Invalid credentials",
      },
      { status: 401 }
    );


  const data = await request.json()

  const pollLocation = await prisma.locationPoll.create({
    data: {
      longitude: data.longitude,
      latitude: data.latitude,
      user: {
        connect: { id: auth.userId }
      }
    }
  })
  return NextResponse.json(
    {
      pollLocation: pollLocation
    },
    { status: 201 }
  );
}
