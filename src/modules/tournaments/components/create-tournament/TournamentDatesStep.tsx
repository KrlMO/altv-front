"use client";

import { TournamentFormData } from "@/modules/tournaments/hooks/useTournamentWizard";

interface TournamentDatesStepProps {
    data: TournamentFormData;
    error: string;
    update: <K extends keyof TournamentFormData>(
        key: K,
        value: TournamentFormData[K]
    ) => void;
}

function toDateInputValue(value: string): string {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function TournamentDatesStep({
    data,
    error,
    update,
}: TournamentDatesStepProps) {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Definí cuándo empieza el torneo. La fecha de fin es opcional:
                sirve para torneos que duran varios días.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
                <label className="flex w-full flex-col gap-1">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Inicio
                    </span>
                    <input
                        type="datetime-local"
                        value={toDateInputValue(data.startAt)}
                        onChange={(e) => update("startAt", e.target.value)}
                        className={`
                            h-10
                            rounded-lg border px-3 py-2 text-sm
                            bg-white dark:bg-zinc-900
                            border-zinc-300 dark:border-zinc-700
                            dark:text-zinc-100
                            focus:outline-none focus:ring-2 focus:ring-btn-primary/60
                            ${error ? "border-red-500" : ""}
                        `}
                    />
                </label>

                <label className="flex w-full flex-col gap-1">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Fin (opcional)
                    </span>
                    <input
                        type="datetime-local"
                        value={toDateInputValue(data.endAt)}
                        onChange={(e) => update("endAt", e.target.value)}
                        className="
                            h-10
                            rounded-lg border px-3 py-2 text-sm
                            bg-white dark:bg-zinc-900
                            border-zinc-300 dark:border-zinc-700
                            dark:text-zinc-100
                            focus:outline-none focus:ring-2 focus:ring-btn-primary/60
                        "
                    />
                </label>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
