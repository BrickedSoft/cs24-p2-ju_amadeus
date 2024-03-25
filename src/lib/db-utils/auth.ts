import { LoginToken } from "@prisma/client";
import prisma from "../db"
import { z } from 'zod'


export const validateTokenUser = async (headers: Headers): Promise<string | undefined> => {
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

  return userId
}