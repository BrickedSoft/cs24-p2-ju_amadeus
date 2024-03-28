'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function navigateToLogin(data: FormData) {
  const oneDay = 24 * 60 * 60 * 1000
  cookies().set('token', 'value', { expires: Date.now() - oneDay })
  cookies().set('userId', 'value', { expires: Date.now() - oneDay })
  cookies().set('role', 'value', { expires: Date.now() - oneDay })

  redirect('/auth/login')
}