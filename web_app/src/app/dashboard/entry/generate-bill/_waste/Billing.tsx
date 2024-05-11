"use client";

import { useState } from "react";

import { CustomContractor } from "@/types/contractor";
import { WasteWithDate } from "@/types/wasteEntry";
import SelectBilling from "./BillingSelect";

const Billing: React.FC<{
  contractorList: CustomContractor[];
}> = ({ contractorList }) => {
  const [selectedEntry, setSelectedEntry] = useState<WasteWithDate>();

  return (
    <div className="h-full flex flex-col gap-8">
      <SelectBilling
        contractorList={contractorList}
        setSelectedContractor={setSelectedEntry}
      />
    </div>
  );
};
export default Billing;
