export interface TeamGame {
    id: number;
    name: string;
    logo: string;
    game_id: number;
}

export interface TeamGameFilters {
    name?: string;
    region_id?: number;
    country_id?: number;
    game_id?: number;
    sort_by?: "name_asc" | "name_desc" | "newest" | "oldest";
    page?: number;
}

export interface PaginatedTeamGames {
    data: TeamGame[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}
