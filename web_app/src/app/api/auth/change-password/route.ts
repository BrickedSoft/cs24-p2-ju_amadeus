import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { hashPassword, validatePassword } from "@/lib/utils/encoding";
import { validateTokenUser } from "@/lib/db-utils/auth";

const schema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());

  const auth = await validateTokenUser(request);

  if (!parsed.success || !auth) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const { oldPassword, newPassword } = parsed.data;

  const user: User | null = await prisma.user.findUnique({
    where: {
      id: auth.userId,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  if (oldPassword == newPassword)
    return NextResponse.json(
      { message: "New password cannot be same as old password" },
      { status: 400 },
    );

  if (!(await validatePassword(oldPassword, user.password)))
    return NextResponse.json(
      { message: "Wrong old password" },
      { status: 400 },
    );

  await prisma.user.update({
    where: user,
    data: {
      ...user,
      password: await hashPassword(newPassword),
    },
  });

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
