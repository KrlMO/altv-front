export interface Team {
    id: string;
    name: string;
    tag: string;
    description: string;
    country: string;
    country_id: number;
    logo: string;
    cover: string;
}

export interface MyTeamListItem {
    id: string;
    name: string;
    logo: string;
    member_role: string;
}

export interface CreateTeamDTO {
    name: string;
    tag: string;
    description: string;
    country_id: number;
    logo?: File;
    cover?: File;
}

export type UpdateTeamDTO = Partial<CreateTeamDTO>;