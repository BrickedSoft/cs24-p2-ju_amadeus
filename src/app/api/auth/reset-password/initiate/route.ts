import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { generateRandomToken } from "@/lib/utils/encoding";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const { email } = parsed.data;

  const user: User | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...user,
      resetToken: generateRandomToken(8),
    },
  });

  return NextResponse.json(
    { message: "Success", resetToken: updatedUser.resetToken },
    { status: 200 },
  );
}
