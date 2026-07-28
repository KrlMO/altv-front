import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { User } from "@/types/user";
import { PlayerSearchResult } from "../models/users.models";
import { PlayerSearchResponseDTO } from "../dto/users.dto";
import { mapPlayerSearchResponseToModel } from "../mappers/users.mapper";

export async function getMeRequest(accessToken?: string) {
    return apiFetch<SuccessResponse<User>>("/v1/users/me",
        { method: "GET", }
        , accessToken
    );
}

export async function searchPlayers(query: string, token: string): Promise<PlayerSearchResult[]> {
    const response = await apiFetch<SuccessResponse<PlayerSearchResponseDTO[]>>(
        `/v1/users/search?q=${encodeURIComponent(query)}`,
        { method: "GET" },
        token
    );
    return response.data.map(mapPlayerSearchResponseToModel);
}
