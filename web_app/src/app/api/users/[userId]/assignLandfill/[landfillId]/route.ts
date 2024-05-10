import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; landfillId: string } },
) {
  console.log("sadg", params);
  const auth = await validateTokenUser(request);
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);
  const queryUserId = params.userId;
  const landfillId = params.landfillId;

  if (!authAdmin && (!auth || auth.userId != queryUserId))
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  await prisma.user.update({
    where: { id: queryUserId },
    data: { landfill: { connect: { id: landfillId } } },
  });

  return NextResponse.json(
    {
      message: "success",
    },
    { status: 200 },
  );
}
