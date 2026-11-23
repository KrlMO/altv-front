export interface TournamentType {
    id: number;
    name: string;
}

export interface TournamentItemDTO {
    id: number;
    name: string;
    logo?: string | null;
    game_id: number;
    game_name: string;
    organizer_type?: "OFFICIAL" | "COMMUNITY" | "INDEPENDENT" | null;
    organization_id?: number | null;
    organization?: string | null;
    type_id?: number | null;
    type_name?: string | null;
    region_name?: string | null;
    region_iso?: string | null;
    country_name?: string | null;
    start_at: string;
    end_at?: string | null;
    status: string;
    created_at: string;
}

export interface TournamentFilters {
    name?: string;
    region_id?: number;
    country_id?: number;
    game_id?: number;
    organizer_type?: "OFFICIAL" | "COMMUNITY" | "INDEPENDENT";
    type_id?: number;
    status?: "active" | "upcoming" | "finished";
    sort_by?: "start_date_asc" | "start_date_desc" | "name_asc" | "name_desc" | "newest";
    page?: number;
}

export interface TournamentPaginationMeta {
    total: number;
    limit: number;
    offset: number;
}

export interface PaginatedTournaments {
    data: TournamentItemDTO[];
    meta: TournamentPaginationMeta;
}
