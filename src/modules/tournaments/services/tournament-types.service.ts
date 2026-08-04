import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { TournamentType } from "../dto/tournament.dto";

export async function fetchTournamentTypes(): Promise<TournamentType[]> {
    const response = await apiFetch<SuccessResponse<TournamentType[]>>(
        "/v1/tournament-types",
        { method: "GET" }
    );
    return response.data;
}
