import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/constants/userContants";
import { z } from "zod";
import { WasteEntry } from "@prisma/client";


export async function GET(request: NextRequest) {
  const auth = await validateTokenUser(request);

  if (!auth)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const wasteEntries = await prisma.wasteEntry.findMany({
    where: {
      OR: [
        {
          STS: {
            manager: {
              some: { id: auth.userId },
            },
          },
        },
      ],
    },
    include: {
      STS: true,
      vehicle: {
        include: {
          STS: true,
        },
      },
      contractor: true,
    },
  });

  return NextResponse.json(
    {
      wasteEntries: wasteEntries.map((ele) => ({
        ...ele,
        stsName: ele.vehicle?.STS?.name,
        vehicleNumber: ele.vehicle?.number,
        contractorName: ele.contractor?.name,
      })),
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
