"use client";

import { useState } from "react";
import { useStages } from "../hooks/useStages";
import { StageTabs } from "../components/StageTabs";
import { StageContent } from "./StageContent";

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
        return <p className="text-sm text-neutral-500">Cargando etapas…</p>;
    }
    if (stagesError) {
        return <p className="text-sm text-red-400">{stagesError}</p>;
    }
    if (!stages || stages.length === 0) {
        return (
            <p className="text-sm text-neutral-500">
                Este torneo aún no tiene etapas definidas.
            </p>
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
