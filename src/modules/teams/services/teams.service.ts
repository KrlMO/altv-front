import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { Team, MyTeamListItem } from "../models/teams";
import {
    MyTeamListItemDTO,
    TeamResponseDTO,
    CreateTeamRequestDTO,
    UpdateTeamRequestDTO,
} from "../dto/teams.dto";
import {
    mapTeamResponseToModel,
    mapMyTeamListItemDTOToModel,
} from "../mappers/teams.mapper";

export async function fetchMyTeams(token: string): Promise<MyTeamListItem[]> {
    const response = await apiFetch<SuccessResponse<MyTeamListItemDTO[]>>(
        "/v1/teams/my",
        { method: "GET" },
        token
    );
    return response.data.map(mapMyTeamListItemDTOToModel);
}

export async function fetchTeamById(id: string, token: string): Promise<Team> {
    const response = await apiFetch<SuccessResponse<TeamResponseDTO>>(
        `/v1/teams/${id}`,
        { method: "GET" },
        token
    );
    return mapTeamResponseToModel(response.data);
}

export async function createTeam(
    data: CreateTeamRequestDTO,
    token: string
): Promise<Team> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tag", data.tag);
    formData.append("description", data.description);
    formData.append("country_id", String(data.country_id));
    if (data.logo) formData.append("logo", data.logo);
    if (data.banner) formData.append("banner", data.banner);

    const response = await apiFetch<SuccessResponse<TeamResponseDTO>>(
        "/v1/teams",
        { method: "POST", headers: {}, body: formData },
        token
    );
    return mapTeamResponseToModel(response.data);
}

export async function updateTeam(
    id: string,
    data: UpdateTeamRequestDTO,
    token: string
): Promise<Team> {
    const formData = new FormData();
    if (data.name !== undefined) formData.append("name", data.name);
    if (data.tag !== undefined) formData.append("tag", data.tag);
    if (data.description !== undefined)
        formData.append("description", data.description);
    if (data.country_id !== undefined)
        formData.append("country_id", String(data.country_id));
    if (data.logo) formData.append("logo", data.logo);
    if (data.banner) formData.append("banner", data.banner);

    formData.append("_method", "PUT");

    const response = await apiFetch<SuccessResponse<TeamResponseDTO>>(
        `/v1/teams/${id}`,
        { method: "POST", headers: {}, body: formData },
        token
    );
    return mapTeamResponseToModel(response.data);
}
