import { Dispatch, SetStateAction, useState } from "react";

import {
  columnData,
  instruction,
  query,
  type,
} from "@/assets/data/dashboard/entry/billingWaste";
import { Input } from "@/components/ui/input";
import { CustomContractor } from "@/types/contractor";
import { WasteWithDate } from "@/types/wasteEntry";
import _ from "lodash";
import Middleware from "../../_components/Middleware";

type props = {
  contractorList: CustomContractor[];
  setSelectedContractor: Dispatch<SetStateAction<WasteWithDate | undefined>>;
};
const SelectBilling: React.FC<props> = ({
  contractorList,
  setSelectedContractor,
}) => {
  const [finRate, setFineRate] = useState<number>(0);

  return (
    <div className="flex flex-col gap-8 divide-y-[1px]">
      <div className="flex gap-4 items-center">
        <p className="text-medium font-medium text-gray-500">
          {"Enter the fine rate: "}
        </p>
        <Input
          contentEditable={false}
          name={"fineRate"}
          id={"fineRate"}
          type={"number"}
          required
          step={0.1}
          maxLength={32}
          onChange={(e) => setFineRate(parseFloat(e.target.value))}
          value={finRate}
          className={`max-w-[120px] border-gray-300 placeholder:text-gray-600 h-8`}
        />
      </div>

      {contractorList.map((contractor) => {
        const groupedData = _.groupBy(contractor.WasteEntry, (item) =>
          new Date(
            new Date(item.collectionDate).toISOString().substring(0, 10)
          ).toISOString()
        );

        const wasteVolumes = _.chain(Object.values(groupedData))
          .map((item) =>
            _.map(item, (ele) => ({
              wasteVolume: ele.wasteVolume,
              collectionDate: ele.collectionDate,
            }))
          )
          .map((item) => {
            const total = _.sumBy(item, "wasteVolume");
            const totalFine =
              total < contractor.wasteVolume
                ? (contractor.wasteVolume - total) * finRate
                : 0;
            const pay = contractor.salary * total;

            return {
              wasteVolume: total,
              collectionDate: new Date(
                item[0].collectionDate
              ).toLocaleDateString(),
              shortage:
                total < contractor.wasteVolume
                  ? contractor.wasteVolume - total
                  : 0,
              totalFine,
              pay,
              totalBill: pay - totalFine,
            };
          })
          .value() as unknown as WasteWithDate[];

        return (
          <div key={contractor.id} className="flex flex-col gap-2 pt-8">
            <div className="flex flex-col gap-2">
              {[
                {
                  title: "Contractor",
                  value: contractor.name,
                },
                {
                  title: "Required waste to collect",
                  value: contractor.wasteVolume,
                },
                {
                  title: "Payment per tonnage of waste in taka",
                  value: contractor.salary,
                },
              ].map((item, index) => (
                <p
                  key={index}
                  className="text-medium font-medium  !text-gray-500"
                >
                  <span>{item.title}: </span>
                  <span className="text-primary">{item.value}</span>
                </p>
              ))}
            </div>
            <Middleware
              data={wasteVolumes}
              type={type}
              columnData={columnData}
              setEntry={setSelectedContractor}
              query={query}
              instruction={instruction}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SelectBilling;
