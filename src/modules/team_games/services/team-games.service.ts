import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import {
    PaginatedTeamGames,
    TeamGameFilters,
    TeamGameItemDTO,
    TeamGameManageMemberDTO,
    AddTeamGameMembersPayloadDTO,
    TeamGameRolePayloadDTO,
    CreateTeamGameResponseDTO,
    CreateTeamGamePayload,
    CreateRosterPayload,
} from "../dto/team-game.dto";
import { TeamGameItem } from "../models/team-game.models";
import { mapTeamGameItemResponseToModel } from "../mappers/team-game.mapper";

export async function fetchTeamGamesByTeam(
    teamId: string,
    token: string
): Promise<TeamGameItem[]> {
    const response = await apiFetch<SuccessResponse<TeamGameItemDTO[]>>(
        `/v1/teams/${teamId}/team-games`,
        { method: "GET" },
        token
    );
    return (response.data ?? []).map(mapTeamGameItemResponseToModel);
}

export async function createTeamGame(
    teamId: string,
    data: CreateTeamGamePayload,
    token: string
): Promise<CreateTeamGameResponseDTO> {
    const response = await apiFetch<SuccessResponse<CreateTeamGameResponseDTO>>(
        `/v1/teams/${teamId}/games`,
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        token
    );
    return response.data;
}

export async function createRoster(
    teamId: string,
    payload: CreateRosterPayload,
    token: string
): Promise<string> {
    const formData = new FormData();
    formData.append("game_slug", payload.gameSlug);
    formData.append("members", JSON.stringify(payload.members));
    for (const [userId, file] of Object.entries(payload.jerseys)) {
        formData.append(`jersey_${userId}`, file);
    }

    const response = await apiFetch<SuccessResponse<CreateTeamGameResponseDTO>>(
        `/v1/teams/${teamId}/team-games`,
        { method: "POST", body: formData },
        token
    );
    return response.data.id;
}

export async function deactivateTeamGame(
    teamGameId: string,
    token: string
): Promise<void> {
    await apiFetch(`/v1/team-games/${teamGameId}/deactivate`, {
        method: "PATCH",
    }, token);
}

export async function activateTeamGame(
    teamGameId: string,
    token: string
): Promise<void> {
    await apiFetch(`/v1/team-games/${teamGameId}/activate`, {
        method: "PATCH",
    }, token);
}

export async function fetchTeamGameManageMembers(
    teamGameId: string,
    token: string
): Promise<TeamGameManageMemberDTO[]> {
    const response = await apiFetch<SuccessResponse<TeamGameManageMemberDTO[]>>(
        `/v1/team-games/${teamGameId}/members/manage`,
        { method: "GET" },
        token
    );
    return response.data ?? [];
}

export async function addTeamGameMembers(
    teamGameId: string,
    payload: AddTeamGameMembersPayloadDTO,
    token: string
): Promise<void> {
    await apiFetch(`/v1/team-games/${teamGameId}/members`, {
        method: "POST",
        body: JSON.stringify(payload),
    }, token);
}

export async function removeTeamGameMembers(
    teamGameId: string,
    userIds: number[],
    token: string
): Promise<void> {
    await apiFetch(`/v1/team-games/${teamGameId}/members`, {
        method: "DELETE",
        body: JSON.stringify({ members: userIds }),
    }, token);
}

export async function addTeamGameMemberRole(
    teamGameId: string,
    users: TeamGameRolePayloadDTO[],
    token: string
): Promise<void> {
    await apiFetch(`/v1/team-games/${teamGameId}/members/roles`, {
        method: "POST",
        body: JSON.stringify({ users }),
    }, token);
}

export async function removeTeamGameMemberRole(
    teamGameId: string,
    users: TeamGameRolePayloadDTO[],
    token: string
): Promise<void> {
    await apiFetch(`/v1/team-games/${teamGameId}/members/roles`, {
        method: "DELETE",
        body: JSON.stringify({ users }),
    }, token);
}

export async function uploadTeamGameMemberJersey(
    teamGameId: string,
    userId: string,
    file: File,
    token: string
): Promise<string> {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("file", file);

    const response = await apiFetch<SuccessResponse<{ jersey_photo: string }>>(
        `/v1/team-games/${teamGameId}/members/jersey`,
        { method: "POST", body: formData },
        token
    );
    return response.data.jersey_photo;
}

export async function fetchTeamGames(
    filters: TeamGameFilters
): Promise<PaginatedTeamGames> {
    const params = new URLSearchParams();

    if (filters.name) params.set("name", filters.name);
    if (filters.region_id) params.set("region_id", String(filters.region_id));
    if (filters.country_id) params.set("country_id", String(filters.country_id));
    if (filters.game_id) params.set("game_id", String(filters.game_id));
    if (filters.sort_by) params.set("sort_by", filters.sort_by);
    if (filters.page) params.set("page", String(filters.page));

    const qs = params.toString();
    const endpoint = `/v1/team-games${qs ? `?${qs}` : ""}`;

    const response =
        await apiFetch<SuccessResponse<PaginatedTeamGames>>(endpoint, {
            method: "GET",
        });

    return response.data;
}
