import { Skeleton } from "@/components/ui/skeleton";

export function SidebarFooterSkeleton() {
  return (
    <div className="w-full p-4 flex flex-col gap-4 ">
      <Skeleton className="h-4 w-[40%]" />
      <div className="w-full flex justify-center items-center gap-4 ">
        <Skeleton className="w-[15%] h-8  rounded-full" />
        <div className="w-[85%] flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
