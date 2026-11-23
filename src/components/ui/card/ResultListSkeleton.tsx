"use client";

interface ResultListSkeletonProps {
    /** Number of placeholder rows to render. */
    rows?: number;
    /** Accessible label announced while loading. */
    label?: string;
    /** Shape of the leading avatar placeholder. */
    shape?: "rounded" | "circle";
}

export function ResultListSkeleton({
    rows = 4,
    label = "Cargando resultados",
    shape = "rounded",
}: ResultListSkeletonProps) {
    return (
        <div
            className="flex flex-col gap-2"
            aria-busy="true"
            aria-label={label}
        >
            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
                >
                    <div
                        className={`${
                            shape === "circle" ? "rounded-full" : "rounded-lg"
                        } h-10 w-10 shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-700`}
                    />
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                        <div className="h-2.5 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                    <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
            ))}
        </div>
    );
}
