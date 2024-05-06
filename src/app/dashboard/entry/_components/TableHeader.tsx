import { ArrowUpDown } from "lucide-react";

import { Button } from "@components/ui/button";

type Props = {
  column: any;
  name: string;
};

const TableHeader: React.FC<Props> = ({ column, name }) => {
  return (
    <Button
      className="text-sm"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4 text-sm" />
    </Button>
  );
};

export default TableHeader;
