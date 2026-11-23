export interface MyTeamListItemDTO {
    id: string;
    name: string;
    logo: string;
    member_role: string;
}

export interface CountryDTO {
    id: number;
    name: string;
    flag_path: string;
    iso_code: string;
}

export interface TeamResponseDTO {
    id: string;
    name: string;
    tag: string;
    description: string;
    country: CountryDTO;
    logo: string;
    banner: string;
    is_virtual: boolean;
    active: boolean;
    color_hex?: string;
    team_games?: TeamGameResponseDTO[];
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

export interface CreateTeamRequestDTO {
    name: string;
    tag: string;
    description: string;
    country_id: number;
    logo?: File;
    banner?: File;
}

export type UpdateTeamRequestDTO = Partial<CreateTeamRequestDTO>;
