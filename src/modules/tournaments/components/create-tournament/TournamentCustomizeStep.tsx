"use client";

import { GeneralButton } from "@/components/ui/buttom/GeneralButton";
import { TournamentFormData } from "@/modules/tournaments/hooks/useTournamentWizard";

interface TournamentCustomizeStepProps {
    data: TournamentFormData;
    error: string;
    creating: boolean;
    update: <K extends keyof TournamentFormData>(
        key: K,
        value: TournamentFormData[K]
    ) => void;
    onBack: () => void;
    onSubmit: () => void;
}

const colorPresets = ["#88008B", "#D300D8", "#15FFEB", "#00302C", "#131A2A", "#FF6B00"];

function formatDate(value: string): string {
    if (!value) return "—";
    return new Date(value).toLocaleString("es-AR", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

export function TournamentCustomizeStep({
    data,
    error,
    creating,
    update,
    onBack,
    onSubmit,
}: TournamentCustomizeStepProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <input
                    type="color"
                    value={data.colorHex}
                    onChange={(e) => update("colorHex", e.target.value)}
                    aria-label="Color del torneo"
                    className="h-9 w-12 cursor-pointer rounded border border-zinc-300 bg-transparent dark:border-zinc-700"
                />
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    {data.colorHex.toUpperCase()}
                </span>
            </div>

            <div className="flex flex-wrap gap-2">
                {colorPresets.map((color) => (
                    <button
                        key={color}
                        type="button"
                        aria-label={`Usar color ${color}`}
                        onClick={() => update("colorHex", color)}
                        className={`h-7 w-7 rounded-full transition-transform hover:scale-110 ${
                            data.colorHex.toLowerCase() === color.toLowerCase()
                                ? "ring-2 ring-white dark:ring-zinc-300"
                                : ""
                        }`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <div
                className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700"
                style={{
                    borderLeftWidth: 4,
                    borderLeftColor: data.colorHex,
                }}
            >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Resumen del torneo
                </p>
                <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {data.name.trim() || "Torneo sin nombre"}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    {data.game?.name ?? "—"} · {data.organization?.name ?? "—"}
                </p>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Inicio: {formatDate(data.startAt)}
                </p>
                {data.endAt && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Fin: {formatDate(data.endAt)}
                    </p>
                )}
                {data.description.trim() && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {data.description.trim()}
                    </p>
                )}
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex items-center justify-between">
                <GeneralButton variant="secondary" type="button" onClick={onBack}>
                    Atrás
                </GeneralButton>
                <GeneralButton
                    type="button"
                    onClick={onSubmit}
                    disabled={creating}
                >
                    {creating ? "Creando…" : "Crear torneo"}
                </GeneralButton>
            </div>
        </div>
    );
}
