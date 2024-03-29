import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { RoleType } from "@/lib/constants/userContants";
import { z } from "zod";
import { hashPassword } from "@/lib/utils/encoding";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(),
});

export async function GET(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });

  return NextResponse.json(
    {
      users: users.map((ele) => ({
        id: ele.id,
        name: ele.name,
        email: ele.email,
        roleId: ele.roleId,
        role: ele.role.name,
      })),
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  const authAdmin = await validateTokenUser(request, RoleType.SYSTEM_ADMIN);

  const parsed = schema.safeParse(await request.json());

  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Invalid data",
      },
      { status: 400 },
    );

  if (!authAdmin)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 },
    );

  const { name, email, password, role } = parsed.data;
  const userExist = await prisma.user.findUnique({ where: { email: email } });

  if (userExist)
    return NextResponse.json(
      {
        message: "Email already in use",
      },
      { status: 400 },
    );

  const userRole = await prisma.role.findUnique({ where: { name: role } });
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: await hashPassword(password),
      role: { connect: { id: userRole?.id } },
    },
  });

  return NextResponse.json(
    {
      user: user,
    },
    { status: 200 },
  );
}
