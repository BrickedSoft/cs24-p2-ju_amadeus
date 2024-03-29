import { Skeleton } from "./skeleton";
const CardLoading = () => (
  <div className="flex flex-col space-y-3 mt-12">
    <Skeleton className="h-[180px] w-full rounded-xl" />
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="w-10/12">
          <Skeleton className="h-4 mb-2" />
          <Skeleton className="h-4" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </div>
  </div>
);

export default CardLoading;
