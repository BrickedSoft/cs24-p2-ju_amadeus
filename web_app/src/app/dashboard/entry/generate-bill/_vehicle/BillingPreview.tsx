"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { VehicleRoute } from "@prisma/client";

import Spinner from "@/components/ui/spinner";
import { CustomVehicleEntry } from "@allTypes";
import { buttons, error, title } from "@/assets/data/dashboard/entry/billingVehicle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { Close } from "@icons";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import BillingGenerate from "./BillingGenerate";
import BillingPdf from "./BillingPdf";

const BillingPreview: React.FC<{
  vehicleEntry: CustomVehicleEntry | undefined;
  setVehicleEntry: Dispatch<SetStateAction<CustomVehicleEntry | undefined>>;
  vehicleRouteList: VehicleRoute[];
}> = ({ vehicleEntry, vehicleRouteList, setVehicleEntry }) => {
  const [open, setOpen] = useState(false);

  const [vehicleRoute, setVehicleRoute] = useState<VehicleRoute>();
  const [cost, setCost] = useState<number>();

  useEffect(() => {
    if (vehicleEntry) {
      const routeList = vehicleRouteList
        .filter(
          (item) =>
            item.stsId == vehicleEntry.vehicle.stsId &&
            item.landFillId == vehicleEntry.landFillId
        )
        .sort((a, b) => {
          if (a.timestamp && b.timestamp)
            return b.timestamp.getTime() - a.timestamp.getTime();
          return 0;
        });
      if (routeList.length) {
        setVehicleRoute(routeList[0]);
        console.log(routeList[0]);
      } else setVehicleRoute(undefined);
    }
  }, [vehicleRouteList, vehicleEntry]);

  // Calculate cost
  useEffect(() => {
    if (vehicleEntry && vehicleRoute && vehicleEntry.vehicle.capacity) {
      const vehicle = vehicleEntry.vehicle;
      // per kilometer fuel cost for this particular trip
      const c_journey_per_km =
        vehicle.fuelCostUnloaded +
        (vehicleEntry.wasteVolume / vehicle.capacity) *
          (vehicle.fuelCostLoaded - vehicle.fuelCostUnloaded);

      const c_journey = c_journey_per_km * (vehicleRoute.distance / 1000.0);
      setCost(c_journey);
    }
  }, [vehicleEntry, vehicleRoute]);

  useEffect(() => {
    if (vehicleEntry) setOpen(true);
  }, [vehicleEntry]);

  const SpinnerCard: React.FC = () => (
    <div className="flex justify-center items-center h-9 w-28">
      <Spinner />
    </div>
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-between items-start mb-1 md:mb-2">
              <p>{title}</p>

              <AlertDialogCancel
                className="h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => setVehicleEntry(undefined)}
              >
                <Close className="h-4 md:h-5 w-5 md:w-5 hover:stroke-destructive transition-all duration-300 cursor-pointer" />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-4">
            <div>
              {vehicleEntry && cost ? (
                <BillingGenerate
                  vehicleEntry={vehicleEntry}
                  vehicleRoute={vehicleRoute}
                  cost={cost}
                />
              ) : (
                <p className="text-sm font-medium text-gray-500">
                  {error.notSelected}
                </p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end gap-4 mt-4">
          <AlertDialogCancel
            variant="outline"
            onClick={() => {
              if (setOpen) setOpen(false);
              setVehicleEntry(undefined);
            }}
          >
            {buttons.close}
          </AlertDialogCancel>

          {vehicleEntry && (
            <AlertDialogAction>
              <Button size={"md"}>
                {vehicleEntry && vehicleRoute && cost ? (
                  <PDFDownloadLink
                    document={
                      <BillingPdf
                        vehicleEntry={vehicleEntry}
                        vehicleRoute={vehicleRoute}
                        cost={cost}
                      />
                    }
                    fileName={`billing-${new Date().toLocaleDateString()}.pdf`}
                  >
                    {({ loading }) =>
                      loading ? <SpinnerCard /> : buttons.download
                    }
                  </PDFDownloadLink>
                ) : (
                  <SpinnerCard />
                )}
              </Button>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BillingPreview;
