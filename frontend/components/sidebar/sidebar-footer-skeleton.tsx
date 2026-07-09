import { Skeleton } from "@/components/ui/skeleton"

export function SidebarFooterSkeleton() {
  return (
    <div className=" p-2 flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col w-full space-y-2">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  )
}
