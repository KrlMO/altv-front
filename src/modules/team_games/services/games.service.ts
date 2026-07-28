import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { Game } from "../models/game.models";
import { GameResponseDTO } from "../dto/game.dto";
import { mapGameResponseToModel } from "../mappers/game.mapper";

export async function searchGames(name: string): Promise<Game[]> {
    const response = await apiFetch<SuccessResponse<GameResponseDTO[]>>(
        `/v1/games?name=${encodeURIComponent(name)}`,
        { method: "GET" }
    );
    return response.data.map(mapGameResponseToModel);
}
