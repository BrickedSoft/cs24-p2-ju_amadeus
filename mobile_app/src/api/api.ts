import { signup } from "@/data/endpoints"
import ecoSync from "./ecoSync"
import { SignUpType } from "@/data/types"

export const signUpApi = async (data: SignUpType) => {
  const res = await ecoSync
    .post(signup, { ...data })
    .then(async (res) => (
      res.status == 201
    )).catch(() => {
      return false
    })
  return res
}