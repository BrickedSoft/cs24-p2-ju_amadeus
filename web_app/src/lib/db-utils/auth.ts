import { LoginToken } from "@prisma/client";
import prisma from "../db";
import { NextRequest } from "next/server";
import { RoleType } from "../../constants/userContants";

export const validateTokenUser = async (
  request: NextRequest,
  requiredRole: string = "none",
): Promise<{ userId: string; role: string; token: string } | undefined> => {
  const userId = request.cookies.get("userId")?.value;
  const token = request.cookies.get("token")?.value;

  if (!token || !userId) return undefined;

  const loginToken: LoginToken[] = await prisma.loginToken.findMany({
    where: {
      userId: userId,
      token: token,
    },
  });

  if (!loginToken.length || loginToken[0].token != token) return undefined;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const role = await prisma.role.findUnique({ where: { id: user?.roleId } });

  const roleName = role ? role.name : RoleType.UNASSIGNED;
  if (requiredRole != "none" && role?.name != requiredRole) return undefined;

  return { userId, role: roleName, token };
};
