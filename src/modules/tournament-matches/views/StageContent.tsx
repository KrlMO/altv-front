"use client";

import { useStageData } from "../hooks/useStageData";
import { BracketView } from "../components/BracketView";
import { SwissRounds } from "../components/SwissRounds";
import { StandingsTable } from "../components/StandingsTable";
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
        return <p className="text-sm text-neutral-500">Cargando partidos…</p>;
    }
    if (error) {
        return <p className="text-sm text-red-400">{error}</p>;
    }

    return (
        <>
            {stage.format === "SINGLE_ELIMINATION" && matches && (
                <BracketView matches={matches} />
            )}

            {(stage.format === "SWISS" || stage.format === "GROUP_STAGE") && (
                <div className="flex flex-col gap-6">
                    {matches && <SwissRounds matches={matches} />}
                    <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                            Posiciones
                        </h3>
                        {standings ? (
                            <StandingsTable standings={standings} />
                        ) : (
                            <p className="text-sm text-neutral-500">
                                Cargando posiciones…
                            </p>
                        )}
                    </div>
                </div>
            )}

            {stage.status === "PENDING" &&
                (!matches || matches.length === 0) && (
                    <p className="text-sm text-neutral-500">
                        Esta etapa aún no comenzó.
                    </p>
                )}
        </>
    );
}
