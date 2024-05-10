import { NextRequest, NextResponse } from "next/server";
import { validateTokenUser } from "@lib/db-utils/auth";
import { z } from "zod";
import prisma from "@lib/db";
import { LandFill, STS, Vehicle, VehicleRoute } from "@prisma/client";
import { TrippingVehicle } from "@/types";

const schema = z.object({
  currSTS: z.string(),
  currLandfill: z.string(),
  items: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  const auth = await validateTokenUser(request);

  const parsed = schema.safeParse(await request.json());

  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Invalid data",
      },
      { status: 400 }
    );

  if (!auth)
    return NextResponse.json(
      {
        message: "Insuficient permission",
      },
      { status: 400 }
    );

  const { currSTS, currLandfill, items } = parsed.data;

  const thisSTS: STS | null = await prisma.sTS.findUnique({ where: { id: currSTS } })
  const thisLandfill: LandFill | null = await prisma.landFill.findUnique({ where: { id: currLandfill } })
  const route: VehicleRoute | null = await prisma.vehicleRoute.findFirst({
    where: {
      stsId: currSTS,
      landFillId: currLandfill
    }
  })
  const vehicleList: Vehicle[] = await prisma.vehicle.findMany({
    where: { id: { in: items } }
  })
  const sortedVehicleList = vehicleList.sort((a, b) => (b.capacity - a.capacity))

  let cost = 0
  let stsWasteRemaining: number = thisSTS?.capacity || 0
  const tripCountById: Map<string, number> = new Map();
  const costById: Map<string, number> = new Map();

  sortedVehicleList.map((vehicle) => {
    const wasteTransportVolume = Math.min(vehicle.capacity, stsWasteRemaining)
    if (wasteTransportVolume && route) {
      stsWasteRemaining = stsWasteRemaining - wasteTransportVolume
      const tripCount: number | undefined = tripCountById.get(vehicle.id)
      if (tripCount)
        tripCountById.set(vehicle.id, tripCount + 1)
      else tripCountById.set(vehicle.id, 1)

      // costing
      const prevCost: number | undefined = costById.get(vehicle.id)
      const currCost: number = costForRoundTrip(vehicle, route, wasteTransportVolume)
      if (prevCost)
        costById.set(vehicle.id, prevCost + currCost)
      else costById.set(vehicle.id, currCost)

    }
  })

  let trippingVehicle: TrippingVehicle[] = []

  for (const vehicle of sortedVehicleList) {
    const tripCount: number | undefined = tripCountById.get(vehicle.id)
    const tripCost: number | undefined = costById.get(vehicle.id)
    if (tripCount && tripCost)
      trippingVehicle.push({
        vehicle: vehicle,
        tripCount: tripCount,
        totalCost: tripCost
      })
  }

  return NextResponse.json(
    {
      trippingVehicle: trippingVehicle
    },
    { status: 200 }
  );
}


const costForRoundTrip = (vehicle: Vehicle, vehicleRoute: VehicleRoute, wasteVolume: number): number => {
  // per kilometer fuel cost for this particular trip
  const c_journey_per_km =
    vehicle.fuelCostUnloaded +
    (wasteVolume / vehicle.capacity) *
    (vehicle.fuelCostLoaded - vehicle.fuelCostUnloaded);

  // cost for this journey
  const c_journey = c_journey_per_km * (vehicleRoute.distance / 1000.0);

  //round trip
  return c_journey * 2
}