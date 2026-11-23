"use client";

interface TeamResultProps {
    logo: string;
    name: string;
    gameName?: string;
}

export function TeamResult({ logo, name, gameName }: TeamResultProps) {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-altv-maindark/60">
            {logo ? (
                <img
                    src={logo}
                    alt={name}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
            ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                    {name.slice(0, 2).toUpperCase()}
                </div>
            )}

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {name}
                </h3>
                {gameName && (
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {gameName}
                    </p>
                )}
            </div>
        </div>
    );
}
