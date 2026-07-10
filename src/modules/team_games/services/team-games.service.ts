import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { PaginatedTeamGames, TeamGameFilters } from "../dto/team-game.dto";

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
