export interface MyTeamListItemDTO {
    id: string;
    name: string;
    logo: string;
    member_role: string;
}

export interface TeamResponseDTO {
    id: string;
    name: string;
    tag: string;
    description: string;
    country: string;
    country_id: number;
    country_iso: string;
    logo: string;
    cover: string;
    color_hex: string;
    team_games: TeamGameResponseDTO[];
}

export interface TeamGameResponseDTO {
    id: string;
    team_id: string;
    game_id: string;
    game_name: string;
    created_at: string;
    roster: RosterMemberResponseDTO[];
}

export interface RosterMemberResponseDTO {
    id: string;
    user_id: string;
    team_id: string;
    role: string;
    team_role: string;
    jersey_photo?: string;
}

export interface RosterMemberDTO {
    user_id: string;
    role?: string;
    team_role: string;
    jersey_photo?: File;
}

export interface RosterEntryDTO {
    game_id: string;
    members: RosterMemberDTO[];
}

export interface CreateTeamRequestDTO {
    name: string;
    tag: string;
    description: string;
    country_id: number;
    logo?: File;
    banner?: File;
    rosters?: RosterEntryDTO[];
}

export type UpdateTeamRequestDTO = Partial<CreateTeamRequestDTO>;
