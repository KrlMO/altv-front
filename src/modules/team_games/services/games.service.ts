import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { Game } from "../dto/game.dto";

export async function searchGames(name: string): Promise<Game[]> {
    const response = await apiFetch<SuccessResponse<Game[]>>(
        `/v1/games?name=${encodeURIComponent(name)}`,
        { method: "GET" }
    );
    return response.data;
}
