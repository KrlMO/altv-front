import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import {
    MatchDTO,
    StandingsRowDTO,
    StageDTO,
} from "../dto/match.dto";
import {
    mapMatchResponseToModel,
    mapStageResponseToModel,
    mapStandingsResponseToModel,
} from "../mappers/match.mapper";
import { Match, Stage, StandingsRow } from "../models/match.models";

export async function fetchTournamentStages(
    tournamentId: number
): Promise<Stage[]> {
    const response = await apiFetch<SuccessResponse<StageDTO[]>>(
        `/v1/tournaments/${tournamentId}/stages`,
        { method: "GET" }
    );
    return response.data.map(mapStageResponseToModel);
}

export async function fetchStageMatches(stageId: number): Promise<Match[]> {
    const response = await apiFetch<SuccessResponse<MatchDTO[]>>(
        `/v1/stages/${stageId}/matches`,
        { method: "GET" }
    );
    return response.data.map(mapMatchResponseToModel);
}

export async function fetchStageStandings(
    stageId: number
): Promise<StandingsRow[]> {
    const response = await apiFetch<SuccessResponse<StandingsRowDTO[]>>(
        `/v1/stages/${stageId}/standings`,
        { method: "GET" }
    );
    return response.data.map(mapStandingsResponseToModel);
}
