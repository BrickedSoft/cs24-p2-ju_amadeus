
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";
import { hashPassword } from "@/lib/utils/encoding";
import { validateTokenUser } from "@/lib/db-utils/auth";
import { IssueReport } from "@prisma/client";

const schema = z.object({
  visible: z.string(),
  location: z.string(),
  description: z.string(),
  issueType: z.string()
});

export async function POST(request: NextRequest) {
  const auth = await validateTokenUser(request);
  if (!auth)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const parsed = schema.safeParse(await request.json());

  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Invalid data",
      },
      { status: 400 },
    );


  const { location, issueType, visible, description } = parsed.data;

  const report: IssueReport = await prisma.issueReport.create({
    data: {
      location: location,
      reportType: issueType,
      description: description,
      user: visible != "Annonymous" ? {
        connect: {
          id: auth.userId
        }
      } : {}
    },


  })


  return NextResponse.json(
    {
      report: report,
    },
    { status: 201 },
  );
}
