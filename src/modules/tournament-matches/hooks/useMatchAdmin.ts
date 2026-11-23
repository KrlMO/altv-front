"use client";

import { useCallback, useState } from "react";
import {
    generateNextSwissRound,
    generateStageMatches,
    setMatchResult,
    setMatchTeams,
    transitionStage,
    StageTransition,
} from "../services/matches-admin.service";

interface AdminActionState {
    loading: boolean;
    error: string | null;
    success: string | null;
}

export function useMatchAdmin(onSuccess: () => void) {
    const [state, setState] = useState<AdminActionState>({
        loading: false,
        error: null,
        success: null,
    });

    const run = useCallback(
        async (action: () => Promise<unknown>, successMessage: string) => {
            setState({ loading: true, error: null, success: null });
            try {
                await action();
                setState({
                    loading: false,
                    error: null,
                    success: successMessage,
                });
                onSuccess();
            } catch (err) {
                setState({
                    loading: false,
                    error:
                        err instanceof Error
                            ? err.message
                            : "Error inesperado",
                    success: null,
                });
            }
        },
        [onSuccess]
    );

    const generate = useCallback(
        (
            stageId: number,
            accessToken: string,
            payload: Parameters<typeof generateStageMatches>[2] = {}
        ) =>
            run(() => generateStageMatches(stageId, accessToken, payload), "Partidos generados"),
        [run]
    );

    const nextRound = useCallback(
        (stageId: number, accessToken: string) =>
            run(() => generateNextSwissRound(stageId, accessToken), "Nueva ronda generada"),
        [run]
    );

    const reportResult = useCallback(
        (
            matchId: number,
            accessToken: string,
            scoreA: number,
            scoreB: number
        ) => run(() => setMatchResult(matchId, accessToken, scoreA, scoreB), "Resultado guardado"),
        [run]
    );

    const assignTeams = useCallback(
        (
            matchId: number,
            accessToken: string,
            teamA?: number,
            teamB?: number
        ) => run(() => setMatchTeams(matchId, accessToken, teamA, teamB), "Equipos asignados"),
        [run]
    );

    const transition = useCallback(
        (stageId: number, accessToken: string, status: StageTransition, label: string) =>
            run(() => transitionStage(stageId, accessToken, status), label),
        [run]
    );

    const clearFeedback = useCallback(() => {
        setState((s) => ({ ...s, error: null, success: null }));
    }, []);

    return {
        ...state,
        generate,
        nextRound,
        reportResult,
        assignTeams,
        transition,
        clearFeedback,
    };
}
