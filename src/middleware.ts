import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateTokenUser } from './lib/db-utils/auth'

export  const middleware = async (request: NextRequest) => {
  // api middlewares
  if (request.nextUrl.pathname.startsWith('/api')) {
    const userId = await validateTokenUser(request.headers)
    // TODO: protect routes here
    if (!userId)
      console.log("anon")

  }
  
  // may write UI middlewares
  else{

  }
  return NextResponse.next()
}


