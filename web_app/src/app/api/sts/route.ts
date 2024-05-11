import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/constants/userContants";
import { z } from "zod";
import { STS, WasteEntry } from "@prisma/client";

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
  wasteVolume: z.string(),
  collectionDate: z.string().pipe(z.coerce.date()),
  vehicleId: z.string().min(1),
  wasteType: z.string().min(1),
  contractorId: z.string().min(1),
  stsId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  console.log(request);
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

  const {
    wasteVolume,
    collectionDate,
    vehicleId,
    wasteType,
    contractorId,
    stsId,
  } = parsed.data;

  // Create a STS
  const wasteEntries: WasteEntry = await prisma.wasteEntry.create({
    data: {
      wasteVolume: parseFloat(wasteVolume),
      collectionDate: collectionDate,
      vehicleId: vehicleId,
      wasteType: wasteType,
      contractorId: contractorId,
      stsId: stsId,
    },
  });

  return NextResponse.json(
    {
      wasteEntries: wasteEntries,
    },
    { status: 200 }
  );
}
