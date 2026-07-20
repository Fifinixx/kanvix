import { Skeleton } from "@/components/ui/skeleton"

export function SidebarHeaderSkeleton() {
  return (
    <div className="p-4 flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-md" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[20%]" />
      </div>
    </div>
  )
}
