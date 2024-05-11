"use server";

import { routes } from "@/assets/data/routes";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addWorkHour = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    userId: z.string(),
    startTime: z.string().pipe(z.coerce.date()),
    endTime: z.string().pipe(z.coerce.date()),
    date: z.string().pipe(z.coerce.date()),
  });

  const parsed = schema.parse({
    userId: formData.get("userId") || undefined,
    startTime: formData.get("startTime") || undefined,
    endTime: formData.get("endTime") || undefined,
    date: formData.get("endTime") || undefined,
  });

  const workForce = await prisma.workforce.findUnique({
    where: { id: parsed.userId },
    include: {
      workHour: true,
    },
  });

  const contractorId = workForce?.contractorId;

  if (!contractorId) return { message: "Contractor not found" };
  const contractor = await prisma.contractor.findUnique({
    where: { id: contractorId },
  });

  const diffInMilliseconds = Math.abs(
    new Date(parsed.endTime).getTime() - new Date(parsed.startTime).getTime()
  );
  const hours = diffInMilliseconds / 3600000;

  const result = await prisma.workHour.create({
    data: {
      startTime: parsed.startTime,
      endTime: parsed.endTime,
      date: parsed.date,
      overtime: contractor?.duration
        ? hours > contractor?.duration
          ? hours - contractor?.duration
          : 0
        : 0,
      workforce: { connect: { id: parsed.userId } },
    },
  });

  revalidatePath("/");
  redirect(routes.workingHourEntries);
};
