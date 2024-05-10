import { RoleType } from "@/constants/userContants";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const sts = await validateTokenUser(request, RoleType.STS_MANAGER);

  if (!authAdmin && !sts)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const contractors = await prisma.contractor.findMany({
    include: {
      STS: true,
      workforces: true,
      manager: true,
    },
  });

  return NextResponse.json(
    {
      contractors: contractors.map((ele) => ({
        id: ele.id,
        name: ele.name,
        contractId: ele.contractId,
        tin: ele.tin,
        contact: ele.contact,
        size: ele.size,
        salary: ele.salary,
        wasteVolume: ele.wasteVolume,
        termination: ele.termination,
        wardNumber: ele.wardNumber,
        STS: ele.STS,
        manager: ele.manager,
        workforces: ele.workforces,
      })),
    },
    { status: 200 }
  );
}
