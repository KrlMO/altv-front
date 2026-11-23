"use client";

import { Stage } from "../models/match.models";

const statusStyles: Record<Stage["status"], string> = {
    PENDING: "text-zinc-500 dark:text-zinc-400",
    IN_PROGRESS: "text-ciangreen",
    COMPLETED: "text-zinc-400 dark:text-zinc-500 line-through",
};

interface StageTabsProps {
    stages: Stage[];
    selectedId: number | undefined;
    onSelect: (stageId: number) => void;
}

export function StageTabs({ stages, selectedId, onSelect }: StageTabsProps) {
    if (stages.length === 0) {
        return (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Este torneo aún no tiene etapas definidas.
            </p>
        );
    }

    return (
        <div className="flex flex-wrap gap-2" role="tablist">
            {stages.map((stage) => {
                const selected = stage.id === selectedId;
                return (
                    <button
                        key={stage.id}
                        role="tab"
                        aria-selected={selected}
                        onClick={() => onSelect(stage.id)}
                        className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                            selected
                                ? "border-btn-primary bg-btn-primary text-white font-semibold"
                                : "border-zinc-200 bg-zinc-100 text-zinc-600 hover:border-btn-primary/50 hover:text-btn-primary dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-altv-maindark"
                        }`}
                    >
                        <span className="block">{stage.name}</span>
                        <span
                            className={`block text-xs ${selected ? "text-white/80" : statusStyles[stage.status]}`}
                        >
                            {stage.formatName} ·{" "}
                            {stage.status === "IN_PROGRESS"
                                ? "En curso"
                                : stage.status === "COMPLETED"
                                  ? "Finalizada"
                                  : "Pendiente"}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
