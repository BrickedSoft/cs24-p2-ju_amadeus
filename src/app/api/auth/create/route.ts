// TODO: delete these
// import { User } from "@prisma/client"
// import { NextRequest, NextResponse } from "next/server"
// import { z } from 'zod'
// import prisma from "@/lib/db"
// import { hashPassword } from "@/lib/utils/encoding"

// const schema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string()
// });

// export async function POST(request: NextRequest) {
//   const response = schema.safeParse(await request.json())

//   if (!response.success) {
//     return NextResponse.json(
//       { message: "Invalid request" },
//       { status: 400 }
//     )
//   }

//   const { name, email, password } = response.data;

//   const user: User = await prisma.user.create({
//     data: {
//       name: name,
//       email: email,
//       password: await hashPassword(password)
//     }
//   })
  
//   return NextResponse.json(
//     { message: "Success" },
//     { status: 201 })

// }
