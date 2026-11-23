"use client";

import { useEffect, useState } from "react";
import { useStages } from "../hooks/useStages";
import { useStageData } from "../hooks/useStageData";
import { useMatchAdmin } from "../hooks/useMatchAdmin";
import { StageTabs } from "../components/StageTabs";
import { MatchCard } from "../components/MatchCard";
import { CreateStageForm } from "../components/CreateStageForm";
import { ResultListSkeleton } from "@/components/ui/card/ResultListSkeleton";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { SecondaryButton } from "@/components/ui/buttom/SecondaryButton";
import {
    createStage,
    fetchStageFormats,
} from "../services/stages-admin.service";
import {
    MatchResultEditor,
    MatchTeamsEditor,
} from "../components/MatchEditors";
import {
    CreateStagePayload,
    StageFormatDTO,
} from "../dto/stage.dto";

interface TournamentManageSectionProps {
    tournamentId: number;
    accessToken: string;
}

export function TournamentManageSection({
    tournamentId,
    accessToken,
}: TournamentManageSectionProps) {
    const [refreshToken, setRefreshToken] = useState(0);
    const { stages, loading, error } = useStages(tournamentId, refreshToken);
    const [selectedStageId, setSelectedStageId] = useState<
        number | undefined
    >(undefined);
    const [formats, setFormats] = useState<StageFormatDTO[] | undefined>(
        undefined
    );
    const [creatingStage, setCreatingStage] = useState(false);
    const [createStageError, setCreateStageError] = useState<string | null>(
        null
    );

    useEffect(() => {
        let cancelled = false;
        fetchStageFormats(accessToken)
            .then((data) => {
                if (!cancelled) setFormats(data);
            })
            .catch(() => {
                if (!cancelled) setFormats([]);
            });
        return () => {
            cancelled = true;
        };
    }, [accessToken]);

    async function handleCreateStage(payload: CreateStagePayload) {
        setCreatingStage(true);
        setCreateStageError(null);
        try {
            await createStage(accessToken, tournamentId, payload);
            setRefreshToken((k) => k + 1);
        } catch (err) {
            setCreateStageError(
                err instanceof Error
                    ? err.message
                    : "Error al crear la etapa"
            );
        } finally {
            setCreatingStage(false);
        }
    }

    if (loading) {
        return <ResultListSkeleton rows={2} label="Cargando etapas" />;
    }
    if (error) {
        return <p className="text-sm text-red-400">{error}</p>;
    }

    const stagesList = stages ?? [];
    const nextOrder = stagesList.reduce((max, s) => Math.max(max, s.order), 0) + 1;
    const createForm = (
        <CreateStageForm
            formats={formats ?? []}
            nextOrder={nextOrder}
            disabled={creatingStage}
            onCreate={handleCreateStage}
        />
    );

    if (!stages || stages.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
                    <p className="font-medium text-zinc-700 dark:text-zinc-200">
                        Este torneo aún no tiene etapas definidas
                    </p>
                    <p className="max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
                        Creá las etapas del torneo para poder generar partidos y
                        cargar resultados.
                    </p>
                </div>
                {createForm}
                {createStageError && (
                    <p className="text-sm text-red-400">{createStageError}</p>
                )}
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
            {createForm}
            {createStageError && (
                <p className="text-sm text-red-400">{createStageError}</p>
            )}
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
                        <MainButton
                            type="button"
                            onClick={() =>
                                admin.generate(stage.id, accessToken)
                            }
                            disabled={admin.loading}
                        >
                            Generar partidos
                        </MainButton>
                    )}

                {stage.format === "SWISS" &&
                    matches &&
                    matches.length > 0 && (
                        <MainButton
                            type="button"
                            onClick={() =>
                                admin.nextRound(stage.id, accessToken)
                            }
                            disabled={admin.loading}
                        >
                            Siguiente ronda
                        </MainButton>
                    )}

                {stage.status === "PENDING" && (
                    <MainButton
                        type="button"
                        onClick={() =>
                            admin.transition(
                                stage.id,
                                accessToken,
                                "IN_PROGRESS",
                                "Etapa iniciada"
                            )
                        }
                        disabled={admin.loading}
                    >
                        Iniciar etapa
                    </MainButton>
                )}

                {stage.status === "IN_PROGRESS" &&
                    matches &&
                    matches.length > 0 && (
                        <SecondaryButton
                            type="button"
                            onClick={() =>
                                admin.transition(
                                    stage.id,
                                    accessToken,
                                    "COMPLETED",
                                    "Etapa finalizada"
                                )
                            }
                            disabled={admin.loading}
                        >
                            Finalizar etapa
                        </SecondaryButton>
                    )}

                {admin.loading && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
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
                <ResultListSkeleton rows={3} label="Cargando partidos" />
            )}
            {error && <p className="text-sm text-red-400">{error}</p>}

            {matches && matches.length > 0 && standings && (
                <div className="flex flex-col gap-3">
                    {matches.map((match) => (
                        <div
                            key={match.id}
                            className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3 sm:flex-row sm:items-center sm:gap-6 dark:border-zinc-700 dark:bg-altv-bgcontent"
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
                <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Sin partidos generados.
                    </p>
                </div>
            )}
        </div>
    );
}
