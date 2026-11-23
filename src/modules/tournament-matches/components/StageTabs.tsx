"use client";

import { Stage } from "../models/match.models";

const statusStyles: Record<Stage["status"], string> = {
    PENDING: "text-neutral-500",
    IN_PROGRESS: "text-emerald-400",
    COMPLETED: "text-neutral-400 line-through",
};

interface StageTabsProps {
    stages: Stage[];
    selectedId: number | undefined;
    onSelect: (stageId: number) => void;
}

export function StageTabs({ stages, selectedId, onSelect }: StageTabsProps) {
    if (stages.length === 0) {
        return (
            <p className="text-sm text-neutral-500">
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
                        className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                            selected
                                ? "bg-white text-black font-semibold"
                                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                        }`}
                    >
                        <span className="block">{stage.name}</span>
                        <span
                            className={`block text-xs ${selected ? "text-neutral-600" : statusStyles[stage.status]}`}
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
