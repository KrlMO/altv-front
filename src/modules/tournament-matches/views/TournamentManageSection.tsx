"use client";

import { useState } from "react";
import { useStages } from "../hooks/useStages";
import { useStageData } from "../hooks/useStageData";
import { useMatchAdmin } from "../hooks/useMatchAdmin";
import { StageTabs } from "../components/StageTabs";
import { MatchCard } from "../components/MatchCard";
import {
    MatchResultEditor,
    MatchTeamsEditor,
} from "../components/MatchEditors";

interface TournamentManageSectionProps {
    tournamentId: number;
    accessToken: string;
}

export function TournamentManageSection({
    tournamentId,
    accessToken,
}: TournamentManageSectionProps) {
    const { stages, loading, error } = useStages(tournamentId);
    const [selectedStageId, setSelectedStageId] = useState<
        number | undefined
    >(undefined);

    if (loading) {
        return <p className="text-sm text-neutral-500">Cargando etapas…</p>;
    }
    if (error) {
        return <p className="text-sm text-red-400">{error}</p>;
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
            <StageManageContent
                key={selectedStage.id}
                stage={selectedStage}
                accessToken={accessToken}
            />
        </section>
    );
}

interface StageManageContentProps {
    stage: import("../models/match.models").Stage;
    accessToken: string;
}

function StageManageContent({ stage, accessToken }: StageManageContentProps) {
    const [refreshToken, setRefreshToken] = useState(0);
    const refetch = () => setRefreshToken((k) => k + 1);
    const { matches, standings, loading, error } = useStageData(
        stage.id,
        stage.format,
        refreshToken
    );
    const admin = useMatchAdmin(refetch);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
                {stage.status === "IN_PROGRESS" &&
                    (!matches || matches.length === 0) && (
                        <button
                            onClick={() =>
                                admin.generate(stage.id, accessToken)
                            }
                            disabled={admin.loading}
                            className="rounded bg-white px-4 py-1.5 text-sm font-semibold text-black disabled:opacity-40"
                        >
                            Generar partidos
                        </button>
                    )}

                {stage.format === "SWISS" &&
                    matches &&
                    matches.length > 0 && (
                        <button
                            onClick={() =>
                                admin.nextRound(stage.id, accessToken)
                            }
                            disabled={admin.loading}
                            className="rounded bg-white px-4 py-1.5 text-sm font-semibold text-black disabled:opacity-40"
                        >
                            Siguiente ronda
                        </button>
                    )}

                {admin.loading && (
                    <span className="text-xs text-neutral-500">
                        Procesando…
                    </span>
                )}
                {admin.error && (
                    <span className="text-xs text-red-400">{admin.error}</span>
                )}
                {admin.success && (
                    <span className="text-xs text-emerald-400">
                        {admin.success}
                    </span>
                )}
            </div>

            {loading && (
                <p className="text-sm text-neutral-500">Cargando partidos…</p>
            )}
            {error && <p className="text-sm text-red-400">{error}</p>}

            {matches && matches.length > 0 && standings && (
                <div className="flex flex-col gap-3">
                    {matches.map((match) => (
                        <div
                            key={match.id}
                            className="flex flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3 sm:flex-row sm:items-center sm:gap-6"
                        >
                            <div className="sm:w-64">
                                <MatchCard match={match} showRoundLabel />
                            </div>
                            <div className="flex flex-col gap-2">
                                <MatchResultEditor
                                    match={match}
                                    disabled={admin.loading}
                                    onSave={(a, b) =>
                                        admin.reportResult(
                                            match.id,
                                            accessToken,
                                            a,
                                            b
                                        )
                                    }
                                />
                                <MatchTeamsEditor
                                    match={match}
                                    participants={standings}
                                    disabled={admin.loading}
                                    onSave={(a, b) =>
                                        admin.assignTeams(
                                            match.id,
                                            accessToken,
                                            a,
                                            b
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {matches && matches.length === 0 && (
                <p className="text-sm text-neutral-500">
                    Sin partidos generados.
                </p>
            )}
        </div>
    );
}
