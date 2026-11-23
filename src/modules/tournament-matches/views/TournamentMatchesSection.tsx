"use client";

import { useState } from "react";
import { useStages } from "../hooks/useStages";
import { StageTabs } from "../components/StageTabs";
import { StageContent } from "./StageContent";
import { ResultListSkeleton } from "@/components/ui/card/ResultListSkeleton";

interface TournamentMatchesSectionProps {
    tournamentId: number;
}

export function TournamentMatchesSection({
    tournamentId,
}: TournamentMatchesSectionProps) {
    const { stages, loading: stagesLoading, error: stagesError } =
        useStages(tournamentId);
    const [selectedStageId, setSelectedStageId] = useState<
        number | undefined
    >(undefined);

    if (stagesLoading) {
        return <ResultListSkeleton rows={2} label="Cargando etapas" />;
    }
    if (stagesError) {
        return <p className="text-sm text-red-400">{stagesError}</p>;
    }
    if (!stages || stages.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
                <p className="font-medium text-zinc-700 dark:text-zinc-200">
                    Este torneo aún no tiene etapas definidas
                </p>
                <p className="max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
                    Cuando el organizador configure el formato de competencia,
                    verás el bracket y las posiciones acá.
                </p>
            </div>
        );
    }

    const selectedStage =
        stages.find((s) => s.id === selectedStageId) ?? stages[0];

    return (
        <section className="flex flex-col gap-6">
            <StageTabs
                stages={stages}
                selectedId={selectedStage.id}
                onSelect={setSelectedStageId}
            />
            {/* key resets the fetch state when the stage changes */}
            <StageContent key={selectedStage.id} stage={selectedStage} />
        </section>
    );
}
