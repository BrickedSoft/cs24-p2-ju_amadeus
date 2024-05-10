import { RoleType } from "@/constants/userContants";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { contractorId: string } }
) {
  const auth = await validateTokenUser(request);
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const queryContractorId = params.contractorId;

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const contractor = await prisma.contractor.findUnique({
    where: { id: queryContractorId },
    include: {
      STS: true,
    },
  });

  if (!contractor)
    return NextResponse.json(
      {
        message: "Not found",
      },
      { status: 400 }
    );

  return NextResponse.json(
    {
      message: "success",
      contractor: {
        name: contractor.name,
        contractId: contractor.contractId,
        tin: contractor.tin,
        contact: contractor.contact,
        size: contractor.size,
        salary: contractor.salary,
        wasteVolume: contractor.wasteVolume,
        termination: contractor.termination,
        wardNumber: contractor.wardNumber,
        STS: contractor.STS,
      },
    },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { contractorId: string } }
) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);

  const queryContractorId = params.contractorId;

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const contractor = await prisma.contractor.delete({
    where: { id: queryContractorId },
  });

  if (!contractor)
    return NextResponse.json(
      {
        message: "Not found",
      },
      { status: 400 }
    );

  return NextResponse.json(
    {
      contractor: {
        name: contractor.name,
        contractId: contractor.contractId,
        tin: contractor.tin,
        contact: contractor.contact,
        size: contractor.size,
        salary: contractor.salary,
        wasteVolume: contractor.wasteVolume,
        termination: contractor.termination,
        wardNumber: contractor.wardNumber,
      },
    },
    { status: 200 }
  );
}
