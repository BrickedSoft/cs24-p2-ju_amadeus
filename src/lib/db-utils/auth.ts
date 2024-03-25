import { LoginToken } from "@prisma/client";
import prisma from "../db"

export const validateTokenUser = async (headers: Headers, requiredRole: string = "none"): Promise<string | undefined> => {
  const userId = headers.get('userid')
  const token = headers.get('token')

  if (!token || !userId)
    return undefined

  const loginToken: LoginToken[] = await prisma.loginToken.findMany({
    where: {
      userId: userId,
      token: token
    }
  })

  if (!loginToken.length || loginToken[0].token != token)
    return undefined

  const user = await prisma.user.findUnique({ where: { id: userId } })
  const role = await prisma.role.findUnique({ where: { id: user?.roleId } })
  if (requiredRole != "none" && role?.name != requiredRole)
    return undefined

  return userId
}