import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";

export interface GenerateMatchesPayload {
    seeding?: "registration_order" | "manual";
    manual_order?: number[];
}

export async function generateStageMatches(
    stageId: number,
    accessToken: string,
    payload: GenerateMatchesPayload = {}
): Promise<number> {
    const response = await apiFetch<SuccessResponse<{ matches: number }>>(
        `/v1/stages/${stageId}/generate`,
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
        accessToken
    );
    return response.data.matches;
}

export async function generateNextSwissRound(
    stageId: number,
    accessToken: string
): Promise<number> {
    const response = await apiFetch<SuccessResponse<{ matches: number }>>(
        `/v1/stages/${stageId}/next-round`,
        { method: "POST", body: JSON.stringify({}) },
        accessToken
    );
    return response.data.matches;
}

export async function setMatchResult(
    matchId: number,
    accessToken: string,
    scoreA: number,
    scoreB: number
): Promise<void> {
    await apiFetch(
        `/v1/matches/${matchId}/result`,
        {
            method: "PATCH",
            body: JSON.stringify({ score_a: scoreA, score_b: scoreB }),
        },
        accessToken
    );
}

export async function setMatchTeams(
    matchId: number,
    accessToken: string,
    teamARegistrationId?: number,
    teamBRegistrationId?: number
): Promise<void> {
    await apiFetch(
        `/v1/matches/${matchId}/teams`,
        {
            method: "PATCH",
            body: JSON.stringify({
                team_a_registration_id: teamARegistrationId ?? 0,
                team_b_registration_id: teamBRegistrationId ?? 0,
            }),
        },
        accessToken
    );
}
