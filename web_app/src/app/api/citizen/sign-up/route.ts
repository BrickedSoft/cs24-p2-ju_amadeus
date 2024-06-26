
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";
import { hashPassword } from "@/lib/utils/encoding";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

// Make citizen
export async function POST(request: NextRequest) {

  const parsed = schema.safeParse(await request.json());

  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Invalid data",
      },
      { status: 400 },
    );


  const { name, email, password } = parsed.data;
  const userExist = await prisma.user.findUnique({ where: { email: email } });

  if (userExist)
    return NextResponse.json(
      {
        message: "Email already in use",
      },
      { status: 400 },
    );

  const userRole = await prisma.role.findUnique({ where: { name: "Citizen" } });
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
    { status: 201 },
  );
}
