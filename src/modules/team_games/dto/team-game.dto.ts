export interface TeamGame {
    id: number;
    name: string;
    logo: string;
    game_id: number;
}

export interface TeamGameItemDTO {
    id: string;
    game_id: string;
    game_name: string;
    logo?: string | null;
    active: boolean;
    created_at?: string;
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

export interface CreateTeamGameResponseDTO {
    id: string;
    message?: string;
}

export interface CreateTeamGamePayload {
    game_slug: string;
}

export interface CreateRosterMember {
    user_id: number;
    role: string;
}

export interface CreateRosterPayload {
    gameSlug: string;
    members: CreateRosterMember[];
    jerseys: Record<string, File>;
}

export interface TeamGameMemberPayloadDTO {
    user_id: number;
    role: string;
}

export interface AddTeamGameMembersPayloadDTO {
    members: TeamGameMemberPayloadDTO[];
    game_id: number;
}

export interface TeamGameRolePayloadDTO {
    user_id: number;
    roles: { name: string }[];
}

export interface TeamGameManageMemberDTO {
    user_id: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string;
    birth_date: string | null;
    country: {
        id: number;
        name: string;
        flag_path: string;
        iso_code: string;
    };
    country_code: string;
    team_role: string;
    jersey_photo: string;
}
