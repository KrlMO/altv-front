import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";

export interface CreateTournamentPayload {
    organization_id: number;
    game_id: number;
    name: string;
    description?: string;
    start_at: string;
    end_at?: string;
    color_hex?: string;
    organizer_type: "COMMUNITY" | "OFFICIAL";
}

export interface GameItem {
    id: number;
    name: string;
}

export async function createTournament(
    accessToken: string,
    payload: CreateTournamentPayload
): Promise<number> {
    const response = await apiFetch<SuccessResponse<{ id: number }>>(
        "/v1/tournaments",
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
        accessToken
    );
    return response.data.id;
}

export async function fetchGames(accessToken?: string): Promise<GameItem[]> {
    const response = await apiFetch<SuccessResponse<GameItem[]>>("/v1/games", {
        method: "GET",
    }, accessToken);
    return response.data;
}
