import { submitReport } from "@/data/endpoints"
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

export const submitReportApi = async (data: any, token: string | undefined | null, userId: string | undefined | null) => {
  const res = await ecoSync
    .post(submitReport, { ...data }, { headers: { token: token, userId: userId } })
    .then(async (res) => (
      res.status == 201
    )).catch(() => {
      return false
    })
  return res
}