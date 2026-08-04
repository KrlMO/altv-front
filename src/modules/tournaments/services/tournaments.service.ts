import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { PaginatedTournaments, TournamentFilters } from "../dto/tournament.dto";

export async function fetchTournaments(
    filters: TournamentFilters
): Promise<PaginatedTournaments> {
    const params = new URLSearchParams();

    if (filters.name) params.set("name", filters.name);
    if (filters.region_id) params.set("region_id", String(filters.region_id));
    if (filters.country_id) params.set("country_id", String(filters.country_id));
    if (filters.game_id) params.set("game_id", String(filters.game_id));
    if (filters.organizer_type) params.set("organizer_type", filters.organizer_type);
    if (filters.type_id) params.set("type_id", String(filters.type_id));
    if (filters.status) params.set("status", filters.status);
    if (filters.sort_by) params.set("sort_by", filters.sort_by);
    if (filters.page) params.set("page", String(filters.page));

    const qs = params.toString();
    const endpoint = `/v1/tournaments${qs ? `?${qs}` : ""}`;

    const response = await apiFetch<SuccessResponse<PaginatedTournaments>>(
        endpoint,
        { method: "GET" }
    );

    return response.data;
}
