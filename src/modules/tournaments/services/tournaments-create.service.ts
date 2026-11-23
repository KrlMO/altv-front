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
