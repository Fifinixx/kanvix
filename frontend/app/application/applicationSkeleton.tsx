import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading placeholder for the /application shell.
 * Mirrors the shadcn sidebar layout (sidebar + inset content)
 * so there's no layout shift when the real UI mounts.
 */
export default function ApplicationSkeleton() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar p-2 md:flex">
        {/* Header / workspace switcher */}
        <div className="flex items-center gap-2 p-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-24 rounded-sm" />
            <Skeleton className="h-3 w-16 rounded-sm" />
          </div>
        </div>

        <div className="my-2 h-px w-full bg-border" />

        {/* Nav group 1 */}
        <div className="flex flex-col gap-1 p-2">
          <Skeleton className="mb-1 h-3 w-16 rounded-sm" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md p-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-3.5 w-full rounded-sm" />
            </div>
          ))}
        </div>

        {/* Nav group 2 */}
        <div className="flex flex-col gap-1 p-2">
          <Skeleton className="mb-1 h-3 w-20 rounded-sm" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md p-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-3.5 w-full rounded-sm" />
            </div>
          ))}
        </div>

        {/* Footer / user */}
        <div className="mt-auto flex items-center gap-2 p-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-24 rounded-sm" />
            <Skeleton className="h-3 w-28 rounded-sm" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
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
    </div>
  );
}
