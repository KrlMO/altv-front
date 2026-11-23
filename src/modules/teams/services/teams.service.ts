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

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

function validateTeamImage(file: File, field: string): void {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error(`La imagen de ${field} debe ser PNG, JPEG o WEBP`);
    }
    if (file.size > MAX_IMAGE_SIZE) {
        throw new Error(`La imagen de ${field} no puede superar los 5MB`);
    }
}

function buildTeamFormData(data: UpdateTeamRequestDTO): FormData {
    const formData = new FormData();

    if (data.name !== undefined) formData.append("name", data.name);
    if (data.tag !== undefined) formData.append("tag", data.tag);
    if (data.description !== undefined)
        formData.append("description", data.description);
    if (data.country_id !== undefined)
        formData.append("country_id", String(data.country_id));
    if (data.logo) {
        validateTeamImage(data.logo, "logo");
        formData.append("logo", data.logo);
    }
    if (data.banner) {
        validateTeamImage(data.banner, "banner");
        formData.append("banner", data.banner);
    }

    return formData;
}

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
    const formData = buildTeamFormData(data);

    const response = await apiFetch<SuccessResponse<TeamResponseDTO>>(
        "/v1/teams",
        { method: "POST", body: formData },
        token
    );
    return mapTeamResponseToModel(response.data);
}

export async function updateTeam(
    id: string,
    data: UpdateTeamRequestDTO,
    token: string
): Promise<Team> {
    const formData = buildTeamFormData(data);

    const response = await apiFetch<SuccessResponse<TeamResponseDTO>>(
        `/v1/teams/${id}`,
        { method: "PATCH", body: formData },
        token
    );
    return mapTeamResponseToModel(response.data);
}
