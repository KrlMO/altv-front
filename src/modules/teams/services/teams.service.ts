import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { Team, MyTeamListItem, CreateTeamDTO, UpdateTeamDTO } from "../models/teams";

export async function fetchMyTeams(token: string): Promise<MyTeamListItem[]> {
    const response = await apiFetch<SuccessResponse<MyTeamListItem[]>>(
        "/v1/teams/my",
        { method: "GET" },
        token
    );
    return response.data;
}

export async function fetchTeamById(id: string, token: string): Promise<Team> {
    const response = await apiFetch<SuccessResponse<Team>>(
        `/v1/teams/${id}`,
        { method: "GET" },
        token
    );
    return response.data;
}

export async function createTeam(data: CreateTeamDTO, token: string): Promise<Team> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tag", data.tag);
    formData.append("description", data.description);
    formData.append("country_id", String(data.country_id));
    if (data.logo) formData.append("logo", data.logo);
    if (data.cover) formData.append("cover", data.cover);

    const response = await apiFetch<SuccessResponse<Team>>("/v1/teams", {
        method: "POST",
        headers: {},
        body: formData,
    }, token);
    return response.data;
}

export async function updateTeam(
    id: string,
    data: UpdateTeamDTO,
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
    if (data.cover) formData.append("cover", data.cover);

    formData.append("_method", "PUT");

    const response = await apiFetch<SuccessResponse<Team>>(
        `/v1/teams/${id}`,
        {
            method: "POST",
            headers: {},
            body: formData,
        },
        token
    );
    return response.data;
}
