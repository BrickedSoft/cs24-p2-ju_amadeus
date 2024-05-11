"use client";

import { VehicleRoute } from "@prisma/client";
import { Document, Page, Text, View } from "@react-pdf/renderer";

import { CustomVehicleEntry } from "@allTypes";
import { headings } from "@/assets/data/dashboard/entry/billingVehicle";

type Props = {
  vehicleEntry: CustomVehicleEntry;
  vehicleRoute: VehicleRoute;
  cost: number;
};

const BillingPdf: React.FC<Props> = ({ vehicleEntry, vehicleRoute, cost }) => {
  const RenderItem: React.FC<{
    item: { title: string; value: string | undefined };
  }> = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        gap: "8px",
      }}
    >
      <Text
        style={{
          fontWeight: 500,
          color: "#64748B",
        }}
      >
        {item.title}:
      </Text>
      <Text
        style={{
          fontWeight: 500,
          color: "#048654",
        }}
      >
        {item?.value}
      </Text>
    </View>
  );

  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: "#fff",
          margin: "64px",
          gap: "48px",
        }}
      >
        {/* <View>
          <Image
            src={logo}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View> */}

        <View
          style={{
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Text
            style={{
              fontWeight: 700,
              color: "#048654",
              fontSize: 24,
            }}
          >
            {headings.vehicle}
          </Text>
          {[
            {
              title: "Date",
              value:
                vehicleEntry &&
                new Date(vehicleEntry.arrivalTime).toLocaleString(),
            },
            {
              title: "Vehicle",
              value: vehicleEntry?.vehicleNumber,
            },
            {
              title: "STS",
              value: vehicleEntry?.stsName,
            },
            {
              title: "Landfill",
              value: vehicleEntry?.landFill.name,
            },
          ].map((item, index) => (
            <RenderItem key={index} item={item} />
          ))}
        </View>

        <View
          style={{
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Text
            style={{
              fontWeight: 700,
              color: "#048654",
              fontSize: 24,
            }}
          >
            {headings.routes}
          </Text>

          {[
            {
              title: "Distance",
              value:
                vehicleRoute?.distance > 1000
                  ? `${(vehicleRoute?.distance / 1000).toFixed(2)} km`
                  : `${vehicleRoute?.distance} m`,
            },
            {
              title: "Duration",
              value: `${vehicleRoute?.duration / 3600 > 1 ? `${Math.floor(vehicleRoute?.duration / 60)} hr` : ""} ${((vehicleRoute?.duration - Math.floor(vehicleRoute?.duration / 3600)) * 3600) / 60 > 1 ? `${Math.floor((vehicleRoute?.duration - Math.floor(vehicleRoute?.duration / 3600) * 3600) / 60)} min` : ""}`,
            },
            {
              title: "Waste Volume",
              value: `${vehicleEntry?.wasteVolume} tons`,
            },
            {
              title: "Cost",
              value: `${cost?.toFixed(2)} currency units`,
            },
          ].map((item, index) => (
            <RenderItem key={index} item={item} />
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default BillingPdf;
