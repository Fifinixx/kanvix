import { Skeleton } from "@/components/ui/skeleton"

export function SidebarContentSkeleton() {
  return (
    <div className="p-2 flex items-center gap-4">
      <div className="space-y-4 w-full">
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  )
}
