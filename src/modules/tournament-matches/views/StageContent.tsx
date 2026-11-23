"use client";

import { useStageData } from "../hooks/useStageData";
import { BracketView } from "../components/BracketView";
import { SwissRounds } from "../components/SwissRounds";
import { StandingsTable } from "../components/StandingsTable";
import { ResultListSkeleton } from "@/components/ui/card/ResultListSkeleton";
import { Stage } from "../models/match.models";

interface StageContentProps {
    stage: Stage;
}

// StageContent renders one stage; keyed by stage id upstream so its state
// resets when the organizer picks another stage.
export function StageContent({ stage }: StageContentProps) {
    const { matches, standings, loading, error } = useStageData(
        stage.id,
        stage.format
    );

    if (loading) {
        return <ResultListSkeleton rows={3} label="Cargando partidos" />;
    }
    if (error) {
        return <p className="text-sm text-red-400">{error}</p>;
    }

    return (
        <>
            {stage.format === "SINGLE_ELIMINATION" && matches && (
                <BracketView matches={matches} stage={stage} />
            )}

            {(stage.format === "SWISS" || stage.format === "GROUP_STAGE") && (
                <div className="flex flex-col gap-6">
                    {matches && <SwissRounds matches={matches} stage={stage} />}
                    <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Posiciones
                        </h3>
                        {standings ? (
                            <StandingsTable standings={standings} />
                        ) : (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Cargando posiciones…
                            </p>
                        )}
                    </div>
                </div>
            )}

            {stage.status === "PENDING" &&
                (!matches || matches.length === 0) && (
                    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
                        <p className="font-medium text-zinc-700 dark:text-zinc-200">
                            Esta etapa aún no comenzó
                        </p>
                        <p className="max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
                            Cuando el organizador la inicie, aparecerán los
                            partidos acá.
                        </p>
                    </div>
                )}
        </>
    );
}
