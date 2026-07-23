import { Skeleton } from "../ui/skeleton";
export default function KanbanProjectSkeleton() {
  return (
    <div className="mt-14 w-full flex flex-1 flex-col overflow-hidden">
      {/* Topbar */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <Skeleton className="h-7 w-7 rounded-md md:hidden" />
        <Skeleton className="h-4 w-40 rounded-sm" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>

      {/* Page body */}
      <main className="flex-1 space-y-6 overflow-y-auto p-6">
        {/* Page heading */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-56 rounded-md" />
          <Skeleton className="h-4 w-80 rounded-sm" />
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-xl border p-5">
              <Skeleton className="h-4 w-24 rounded-sm" />
              <Skeleton className="h-8 w-32 rounded-md" />
              <Skeleton className="h-3 w-full rounded-sm" />
            </div>
          ))}
        </div>

        {/* Large content block */}
        <div className="space-y-4 rounded-xl border p-5">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </main>
    </div>
  );
}
